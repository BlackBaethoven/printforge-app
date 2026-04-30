/**
 * PrintForge — Main Application Logic
 * Handles design generation, metadata creation, and export workflow.
 */

const app = {
    currentNiche: null,
    generatedDesigns: [],
    totalGenerated: 0,
    totalSaved: 0,

    // ─── Style Modifiers for POD-Optimized Prompts ───────────
    styleModifiers: {
        bold_typography: 'bold expressive typography t-shirt design, professional lettering, striking text layout',
        illustration: 'clean vector illustration, modern graphic design, professional artwork',
        vintage: 'retro vintage distressed style, classic 70s 80s aesthetic, worn texture look',
        minimalist: 'minimalist line art, elegant simple design, clean single-weight lines',
        cute: 'kawaii cute cartoon style, adorable chibi character, pastel friendly design',
        dark_aesthetic: 'dark gothic aesthetic, intricate detailed artwork, moody dramatic atmosphere'
    },

    // ─── Initialize ──────────────────────────────────────────
    init() {
        this.renderNiches();
        this.updateEstimate();
        this.setupScrollAnimations();
        this.checkStatus();
    },

    // ─── Server Status Check ─────────────────────────────────
    async checkStatus() {
        try {
            const res = await fetch('/api/status');
            const data = await res.json();
            document.getElementById('stat-status').textContent = 
                data.status === 'online' ? 'System Online' : 'Offline';
        } catch {
            document.getElementById('stat-status').textContent = 'Local Mode';
        }
    },

    // ─── Render Niche Cards ──────────────────────────────────
    renderNiches() {
        const grid = document.getElementById('niche-grid');
        grid.innerHTML = NICHES.map(niche => `
            <div class="niche-card fade-in" onclick="app.selectNiche('${niche.id}')">
                <span class="niche-emoji">${niche.emoji}</span>
                <h3 class="niche-name">${niche.name}</h3>
                <div class="niche-demand">
                    <div class="demand-bar">
                        <div class="demand-fill" style="width: ${niche.demand}%"></div>
                    </div>
                    <span class="demand-label">${niche.demand}% demand</span>
                </div>
            </div>
        `).join('');

        // Stagger fade-in animations
        requestAnimationFrame(() => {
            document.querySelectorAll('.niche-card').forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 60);
            });
        });
    },

    // ─── Select Niche → Open Studio ──────────────────────────
    selectNiche(nicheId) {
        this.currentNiche = NICHES.find(n => n.id === nicheId);
        if (!this.currentNiche) return;

        document.getElementById('section-niches').style.display = 'none';
        document.getElementById('section-studio').style.display = 'block';
        document.getElementById('studio-title').textContent = `${this.currentNiche.emoji} ${this.currentNiche.name}`;
        document.getElementById('studio-subtitle').textContent = 
            `${this.currentNiche.prompts.length} design templates available. Click Generate to create print-ready designs.`;

        // Clear previous designs
        this.generatedDesigns = [];
        document.getElementById('design-grid').innerHTML = '';
        document.getElementById('btn-save-all').disabled = true;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ─── Back to Niche Explorer ──────────────────────────────
    backToNiches() {
        document.getElementById('section-studio').style.display = 'none';
        document.getElementById('section-niches').style.display = 'block';
        this.currentNiche = null;
        this.closeMetaPanel();
    },

    // ─── Change Design Style ─────────────────────────────────
    changeStyle() {
        // Style is read at generation time — nothing to do here
    },

    // ─── Build POD-Optimized Prompt ──────────────────────────
    buildPrompt(basePrompt) {
        const style = document.getElementById('select-style').value;
        const modifier = this.styleModifiers[style] || this.styleModifiers.illustration;
        return `${modifier}, ${basePrompt}, centered composition, isolated on solid black background, high resolution, print-ready t-shirt design, professional quality, no watermarks, no text artifacts`;
    },

    // ─── Generate Batch of Designs ───────────────────────────
    async generateBatch() {
        if (!this.currentNiche) return;

        const batchSize = parseInt(document.getElementById('select-batch').value);
        const btn = document.getElementById('btn-generate');
        const grid = document.getElementById('design-grid');

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';

        // Clear grid
        grid.innerHTML = '';
        this.generatedDesigns = [];

        // Pick random prompts from the niche
        const prompts = this.shuffleArray([...this.currentNiche.prompts]);
        const selectedPrompts = [];
        while (selectedPrompts.length < batchSize) {
            selectedPrompts.push(...prompts);
        }

        // Create ALL placeholder cards first
        for (let i = 0; i < batchSize; i++) {
            const prompt = selectedPrompts[i % prompts.length];
            const fullPrompt = this.buildPrompt(prompt);
            const seed = Math.floor(Math.random() * 999999);
            const imageUrl = `/api/generate-image?prompt=${encodeURIComponent(fullPrompt)}&width=1024&height=1024&seed=${seed}&model=flux`;
            const metadata = this.generateMetadata(this.currentNiche, prompt, i + 1);

            // Create card
            const card = document.createElement('div');
            card.className = 'design-card';
            card.innerHTML = `
                <div class="design-image-wrap">
                    <div class="design-loader" id="loader-${i}">
                        <div class="spinner"></div>
                        <span>Queued #${i + 1}...</span>
                    </div>
                    <img id="img-${i}" alt="${metadata.title}" crossorigin="anonymous">
                </div>
                <div class="design-actions">
                    <span class="design-label">${metadata.title.substring(0, 35)}...</span>
                    <div class="design-btns">
                        <button class="btn-sm" onclick="app.showMetadata(${i})">📋 Meta</button>
                        <button class="btn-sm" onclick="app.downloadDesign(${i})">⬇ Save</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);

            // Store design data
            this.generatedDesigns.push({
                imageUrl,
                metadata,
                loaded: false,
                prompt: fullPrompt
            });
        }

        this.toast(`Generating ${batchSize} designs for ${this.currentNiche.name}...`, 'info');

        // Load images SEQUENTIALLY to avoid rate limiting
        for (let i = 0; i < batchSize; i++) {
            const design = this.generatedDesigns[i];
            const loader = document.getElementById(`loader-${i}`);
            if (loader) {
                loader.innerHTML = `<div class="spinner"></div><span>Generating #${i + 1}...</span>`;
            }

            try {
                await this.loadImage(i, design.imageUrl);
            } catch (err) {
                // Error handling already done in loadImage
            }

            // Small delay between requests to be gentle on the API
            if (i < batchSize - 1) {
                await new Promise(r => setTimeout(r, 1500));
            }
        }

        // Enable save all
        document.getElementById('btn-save-all').disabled = false;
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">⚡</span> Generate More';
        this.toast(`Batch complete! ${this.generatedDesigns.filter(d => d.loaded).length}/${batchSize} designs ready.`, 'success');
    },

    // ─── Load Single Image (Promise-based) ───────────────────
    loadImage(index, imageUrl) {
        return new Promise((resolve) => {
            const img = document.getElementById(`img-${index}`);
            if (!img) return resolve();

            img.onload = () => {
                img.classList.add('loaded');
                const loader = document.getElementById(`loader-${index}`);
                if (loader) loader.style.display = 'none';
                this.generatedDesigns[index].loaded = true;
                this.totalGenerated++;
                document.getElementById('stat-generated').textContent = this.totalGenerated;
                resolve();
            };
            img.onerror = () => {
                const loader = document.getElementById(`loader-${index}`);
                if (loader) {
                    loader.innerHTML = `
                        <span style="color: var(--accent-rose);">⚠ Failed</span>
                        <button class="btn-sm" onclick="app.retryDesign(${index})" style="margin-top:8px;">Retry</button>
                    `;
                }
                resolve(); // Resolve even on error so batch continues
            };
            img.src = imageUrl;
        });
    },

    // ─── Retry Failed Design ─────────────────────────────────
    retryDesign(index) {
        const design = this.generatedDesigns[index];
        if (!design) return;

        const newSeed = Math.floor(Math.random() * 999999);
        const newUrl = design.imageUrl.replace(/seed=\d+/, `seed=${newSeed}`);
        design.imageUrl = newUrl;
        design.loaded = false;

        const loader = document.getElementById(`loader-${index}`);
        if (loader) {
            loader.innerHTML = `<div class="spinner"></div><span>Retrying...</span>`;
            loader.style.display = 'flex';
        }

        const img = document.getElementById(`img-${index}`);
        img.classList.remove('loaded');
        img.src = newUrl;
    },

    // ─── Generate Marketplace Metadata ───────────────────────
    generateMetadata(niche, promptText, designNum) {
        // Extract key theme from prompt
        const cleanPrompt = promptText.replace(/"/g, '');
        const words = cleanPrompt.split(' ').slice(0, 6).join(' ');

        // Title: Niche + Style keyword + product type
        const styleName = document.getElementById('select-style').value.replace('_', ' ');
        const title = `${niche.name} ${this.capitalize(styleName)} Design #${designNum} - ${this.capitalize(words)}`;

        // Tags: niche tags + style tags + generic POD tags
        const genericTags = ['t-shirt', 'tee', 'funny', 'gift', 'trendy', 'unique', 'cool', 'design'];
        const allTags = [...niche.tags, ...genericTags].slice(0, 15);

        // Description
        const description = `${niche.descTemplate} Great for t-shirts, hoodies, mugs, phone cases, stickers, and more. Unique ${styleName} style artwork. Makes an excellent gift idea.`;

        return { title, tags: allTags, description };
    },

    // ─── Show Metadata Panel ─────────────────────────────────
    showMetadata(index) {
        const design = this.generatedDesigns[index];
        if (!design) return;

        const body = document.getElementById('meta-panel-body');
        body.innerHTML = `
            <div class="meta-field">
                <div class="meta-label">
                    <span>Title</span>
                    <button class="meta-copy" onclick="app.copyText('${this.escapeHtml(design.metadata.title)}')">Copy</button>
                </div>
                <div class="meta-value">${design.metadata.title}</div>
            </div>
            <div class="meta-field">
                <div class="meta-label">
                    <span>Tags (${design.metadata.tags.length})</span>
                    <button class="meta-copy" onclick="app.copyText('${design.metadata.tags.join(', ')}')">Copy All</button>
                </div>
                <div class="meta-tags">
                    ${design.metadata.tags.map(t => `<span class="meta-tag">${t}</span>`).join('')}
                </div>
            </div>
            <div class="meta-field">
                <div class="meta-label">
                    <span>Description</span>
                    <button class="meta-copy" onclick="app.copyText(\`${this.escapeHtml(design.metadata.description)}\`)">Copy</button>
                </div>
                <div class="meta-value">${design.metadata.description}</div>
            </div>
            <div class="meta-field" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border);">
                <div class="meta-label"><span>Quick Actions</span></div>
                <button class="btn-sm" style="width:100%; margin-bottom: 8px; padding: 10px;" onclick="app.downloadDesign(${index})">
                    ⬇️ Download Design PNG
                </button>
                <button class="btn-sm" style="width:100%; padding: 10px;" onclick="app.downloadMetadata(${index})">
                    💾 Download Metadata JSON
                </button>
            </div>
        `;

        document.getElementById('meta-panel').classList.add('open');
    },

    // ─── Close Metadata Panel ────────────────────────────────
    closeMetaPanel() {
        document.getElementById('meta-panel').classList.remove('open');
    },

    // ─── Download Design as PNG ──────────────────────────────
    async downloadDesign(index) {
        const design = this.generatedDesigns[index];
        if (!design) return;

        try {
            this.toast('Preparing download...', 'info');

            // Fetch through our proxy to avoid CORS
            const proxyUrl = `/api/generate-image?prompt=${encodeURIComponent(design.prompt)}&width=1024&height=1024&seed=${this.extractSeed(design.imageUrl)}`;
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                // Fallback: try direct URL
                const directResponse = await fetch(design.imageUrl);
                if (!directResponse.ok) throw new Error('Download failed');
                const blob = await directResponse.blob();
                this.toast('Upscaling to 5000x5000...', 'info');
                const upscaledBlob = await this.upscaleImageTo5000(blob);
                this.triggerDownload(upscaledBlob, design.metadata.title);
                return;
            }

            const blob = await response.blob();
            this.toast('Upscaling to 5000x5000...', 'info');
            const upscaledBlob = await this.upscaleImageTo5000(blob);
            this.triggerDownload(upscaledBlob, design.metadata.title);
        } catch (err) {
            // Final fallback: open in new tab
            window.open(design.imageUrl, '_blank');
            this.toast('Opened in new tab. Right-click → Save As.', 'info');
        }
    },

    triggerDownload(blob, title) {
        const safeName = title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_').substring(0, 60);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.totalSaved++;
        document.getElementById('stat-saved').textContent = this.totalSaved;
        this.toast('Design downloaded at 5000x5000! ✓', 'success');
    },

    // ─── Upscale Image to 5000x5000 ──────────────────────────
    upscaleImageTo5000(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 5000;
                canvas.height = 5000;
                const ctx = canvas.getContext('2d');
                
                // High quality image smoothing for vectors/illustrations
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                // Draw upscaled
                ctx.drawImage(img, 0, 0, 5000, 5000);
                
                // Convert back to blob
                canvas.toBlob((upscaledBlob) => {
                    URL.revokeObjectURL(img.src);
                    resolve(upscaledBlob);
                }, 'image/png', 1.0);
            };
            img.onerror = () => {
                URL.revokeObjectURL(img.src);
                reject(new Error('Failed to load image for upscaling'));
            };
            img.src = URL.createObjectURL(blob);
        });
    },

    extractSeed(url) {
        const match = url.match(/seed=(\d+)/);
        return match ? match[1] : '12345';
    },

    // ─── Download Metadata JSON ──────────────────────────────
    downloadMetadata(index) {
        const design = this.generatedDesigns[index];
        if (!design) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(design.metadata, null, 2));
        const safeName = design.metadata.title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_').substring(0, 60);
        
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = `${safeName}_meta.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.toast('Metadata downloaded! ✓', 'success');
    },

    // ─── Save All Designs as ZIP ─────────────────────────────
    async saveAllDesigns() {
        if (typeof JSZip === 'undefined') {
            this.toast('JSZip library not loaded. Please refresh the page.', 'error');
            return;
        }

        const loaded = this.generatedDesigns.filter(d => d.loaded);
        if (loaded.length === 0) {
            this.toast('No designs loaded yet. Wait for generation to complete.', 'error');
            return;
        }

        this.toast(`Preparing ZIP file with ${loaded.length} designs...`, 'info');
        
        try {
            const zip = new JSZip();
            const folderName = (this.currentNiche?.name || 'Designs').replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_');
            const folder = zip.folder(folderName);

            for (let i = 0; i < loaded.length; i++) {
                const design = loaded[i];
                const safeName = design.metadata.title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_').substring(0, 50);
                
                // Fetch image data
                const proxyUrl = `/api/generate-image?prompt=${encodeURIComponent(design.prompt)}&width=1024&height=1024&seed=${this.extractSeed(design.imageUrl)}&model=flux`;
                
                try {
                    const response = await fetch(proxyUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        const upscaledBlob = await this.upscaleImageTo5000(blob);
                        folder.file(`${safeName}.png`, upscaledBlob);
                        folder.file(`${safeName}_meta.json`, JSON.stringify(design.metadata, null, 2));
                    }
                } catch (err) {
                    console.error('Failed to fetch image for ZIP:', err);
                }
            }

            // Generate and download ZIP
            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `PrintForge_${folderName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.totalSaved += loaded.length;
            document.getElementById('stat-saved').textContent = this.totalSaved;
            this.toast('All designs downloaded as ZIP! ✓', 'success');
            
        } catch (error) {
            console.error('ZIP generation failed:', error);
            this.toast('Failed to generate ZIP file.', 'error');
        }
    },

    // ─── Revenue Estimator ───────────────────────────────────
    updateEstimate() {
        const designs = parseInt(document.getElementById('range-designs').value);
        document.getElementById('range-value').textContent = designs;

        const avgProfit = 4; // $4 average profit per sale (Zazzle, KDP, TP)

        // Conservative: 1% of catalog sells daily
        const low = Math.round(designs * 0.01 * avgProfit);
        // Average: 3% sell-through
        const mid = Math.round(designs * 0.03 * avgProfit);
        // Strong: 5% sell-through
        const high = Math.round(designs * 0.05 * avgProfit);

        document.getElementById('est-low').textContent = `$${low}`;
        document.getElementById('est-mid').textContent = `$${mid}`;
        document.getElementById('est-high').textContent = `$${high}`;
    },

    // ─── Scroll Animation Observer ───────────────────────────
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    },

    // ─── Utilities ───────────────────────────────────────────
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    capitalize(str) {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    },

    escapeHtml(str) {
        return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/`/g, '\\`');
    },

    copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.toast('Copied to clipboard! ✓', 'success');
        }).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.toast('Copied! ✓', 'success');
        });
    },

    toast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

// ─── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => app.init());
