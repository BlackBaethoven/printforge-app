import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/printforge', express.static(join(__dirname, 'public')));

// Create output directory for saved designs
const OUTPUT_DIR = join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Health Check ────────────────────────────────────────────
app.get('/api/status', (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// ─── Proxy endpoint for Pollinations (avoids CORS issues on some browsers) ───
app.get('/api/generate-image', async (req, res) => {
  try {
    const { prompt, width, height, seed, model } = req.query;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const params = new URLSearchParams({
      width: width || '1024',
      height: height || '1024',
      nologo: 'true',
      seed: seed || Math.floor(Math.random() * 999999).toString(),
      model: model || 'flux'
    });

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;

    // Retry up to 3 times with delay between attempts
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'User-Agent': 'PrintForge-POD-Factory/1.0' }
        });
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`Pollinations returned ${response.status}`);
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.startsWith('image/')) {
          throw new Error(`Expected image, got ${contentType}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        res.set('Content-Type', contentType);
        res.set('Cache-Control', 'no-cache');
        return res.send(buffer);
      } catch (err) {
        lastError = err;
        console.error(`[generate-image] Attempt ${attempt}/3 failed:`, err.message);
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 2000 * attempt)); // Back off: 2s, 4s
        }
      }
    }

    throw lastError || new Error('All retry attempts failed');
  } catch (error) {
    console.error('[generate-image] Final error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─── Save design to output folder ────────────────────────────
app.post('/api/save-design', async (req, res) => {
  try {
    const { imageUrl, metadata, niche } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });

    // Create niche subfolder
    const nicheDir = join(OUTPUT_DIR, (niche || 'general').replace(/[^a-zA-Z0-9-_]/g, '_'));
    if (!fs.existsSync(nicheDir)) fs.mkdirSync(nicheDir, { recursive: true });

    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    const buffer = Buffer.from(await response.arrayBuffer());

    // Save image
    const timestamp = Date.now();
    const filename = `design_${timestamp}.png`;
    fs.writeFileSync(join(nicheDir, filename), buffer);

    // Save metadata alongside
    if (metadata) {
      const metaFilename = `design_${timestamp}_meta.json`;
      fs.writeFileSync(join(nicheDir, metaFilename), JSON.stringify(metadata, null, 2));
    }

    res.json({ success: true, path: join(niche || 'general', filename) });
  } catch (error) {
    console.error('[save-design]', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─── List saved designs ──────────────────────────────────────
app.get('/api/saved-designs', (_req, res) => {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) return res.json([]);

    const niches = fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => {
        const files = fs.readdirSync(join(OUTPUT_DIR, d.name))
          .filter(f => f.endsWith('.png'));
        return { niche: d.name, count: files.length };
      });

    res.json(niches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Root redirect ───────────────────────────────────────────
app.get('/', (_req, res) => {
  res.redirect('/printforge');
});

// ─── Serve SPA ───────────────────────────────────────────────
app.get('/printforge/*', (_req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  💰  PrintForge — POD Design Factory');
  console.log(`  ➜   http://localhost:${PORT}/printforge`);
  console.log('  ✓   Using FREE Pollinations API (no key needed)');
  console.log('');
});
