/**
 * PrintForge — Niche Database
 * Trending POD niches with AI-optimized prompt templates and marketplace metadata.
 * Each niche is pre-built for maximum marketplace discoverability.
 */

const NICHES = [
    {
        id: 'coffee_lovers',
        name: 'Coffee Lovers',
        emoji: '☕',
        demand: 92,
        keywords: ['coffee', 'caffeine', 'morning', 'espresso', 'latte', 'barista'],
        prompts: [
            'detailed botanical illustration of a coffee plant branch with fresh berries and leaves, vintage scientific drawing style',
            'steaming cup of black espresso sitting on a rustic wooden table next to an open book, cozy moody lighting, hyperrealistic',
            'abstract geometric pattern made of coffee beans and overlapping gold circles, modern minimalist art',
            'watercolor painting of an ornate french press and a ceramic mug, soft pastel colors, delicate fluid brushstrokes',
            'typography "But First Coffee" integrated into a complex mandala pattern, highly detailed clean line art',
            'macro photography style illustration of rich espresso crema swirling in a demitasse cup, cinematic lighting'
        ],
        tags: ['coffee lover', 'coffee addict', 'but first coffee', 'caffeine', 'espresso', 'latte', 'barista', 'coffee gift', 'funny coffee', 'morning person', 'coffee beans', 'cafe', 'java', 'coffee mug design'],
        descTemplate: 'Perfect for coffee enthusiasts and caffeine addicts. A unique design that celebrates the love of coffee.'
    },
    {
        id: 'cat_lovers',
        name: 'Cat Parents',
        emoji: '🐱',
        demand: 95,
        keywords: ['cat', 'kitten', 'cat mom', 'cat dad', 'feline', 'meow'],
        prompts: [
            'majestic maine coon cat sitting in a dramatic sunbeam, highly detailed fur texture, moody studio lighting',
            'cute astronaut cat floating in deep space surrounded by glowing pastel nebulas, surreal cosmic illustration',
            'traditional japanese ukiyo-e woodblock print style of a cat sleeping on a zen garden porch, authentic aesthetic',
            'typography "Cat Mom" surrounded by elegant watercolor floral wreaths, soft feminine aesthetic',
            'black cat with glowing yellow eyes perched on a stack of ancient books, gothic dark academia aesthetic',
            'geometric low-poly illustration of a sitting cat face, modern angular vector design with sharp vibrant colors'
        ],
        tags: ['cat lover', 'cat mom', 'cat dad', 'kitten', 'feline', 'meow', 'cat gift', 'crazy cat lady', 'cat person', 'paw prints', 'cat life', 'rescue cat', 'cat owner', 'cat art'],
        descTemplate: 'For the proud cat parent who wants the world to know about their feline obsession.'
    },
    {
        id: 'dog_lovers',
        name: 'Dog Parents',
        emoji: '🐕',
        demand: 96,
        keywords: ['dog', 'puppy', 'dog mom', 'dog dad', 'canine', 'woof'],
        prompts: [
            'detailed pencil sketch of a golden retriever puppy looking up with soulful eyes, hyper-realistic fine art drawing',
            'geometric low-poly illustration of a wolf howling at a geometric moon, modern angular design, cool color palette',
            'typography "Dog Mom" written in elegant cursive intertwined with a minimalist dog leash graphic, chic design',
            'vibrant synthwave sunset with the silhouette of a doberman pinscher, 80s retro outrun aesthetic',
            'watercolor painting of a sleeping french bulldog wrapped in a cozy blanket, soft pastel dreamlike aesthetic',
            'astronaut golden retriever planting a flag on the moon, epic sci-fi illustration'
        ],
        tags: ['dog lover', 'dog mom', 'dog dad', 'puppy', 'dog gift', 'fur baby', 'dog person', 'rescue dog', 'dog owner', 'paw prints', 'woof', 'dog life', 'dog art', 'canine'],
        descTemplate: 'Celebrate your love for dogs with this unique design perfect for any proud dog parent.'
    },
    {
        id: 'gym_fitness',
        name: 'Gym & Fitness',
        emoji: '💪',
        demand: 88,
        keywords: ['gym', 'fitness', 'workout', 'lift', 'gains', 'strong'],
        prompts: [
            'abstract energetic brushstrokes forming the dynamic silhouette of a bodybuilder posing, fluid aggressive art style',
            'metallic silver kettlebell shattering the concrete ground, intense action scene, high contrast dramatic lighting',
            'typography "No Pain No Gain" styled like glowing neon gym signs against a dark brick wall, atmospheric',
            'ancient greek marble statue of a spartan warrior lifting a modern barbell, surreal classical fusion',
            'minimalist geometric design of crossed barbells and plates, clean modern gym apparel logo',
            'typography "I Workout Because I Really Like Food" written in a fun bold bubble font, humorous design'
        ],
        tags: ['gym', 'fitness', 'workout', 'bodybuilding', 'weightlifting', 'gym motivation', 'no pain no gain', 'gym rat', 'gains', 'strong', 'lift heavy', 'gym life', 'fitness gift', 'exercise'],
        descTemplate: 'Motivational gym design for fitness enthusiasts who live for the gains.'
    },
    {
        id: 'gaming',
        name: 'Gaming Culture',
        emoji: '🎮',
        demand: 91,
        keywords: ['gaming', 'gamer', 'video games', 'controller', 'level up', 'respawn'],
        prompts: [
            'detailed isometric view of a cozy gamer bedroom with glowing RGB lights and a mechanical keyboard, lo-fi aesthetic',
            'cyberpunk samurai standing in neon rain holding a glowing katana, highly detailed character concept art',
            'beautiful glowing fantasy RPG potion bottle filled with swirling galaxy liquid, magical ethereal aesthetic',
            'mecha robot suit schematic blueprints, highly detailed technical drawing, sci-fi anime aesthetic',
            'cute 16-bit pixel art landscape of a magical floating island with a castle, colorful retro RPG style',
            'close-up of a glowing 20-sided dice D20 scattering magical purple sparks, tabletop gaming aesthetic'
        ],
        tags: ['gamer', 'gaming', 'video games', 'player one', 'game controller', 'retro gaming', 'gamer gift', 'nerd', 'geek', 'level up', 'respawn', 'PC gamer', 'console gaming', 'esports'],
        descTemplate: 'For the dedicated gamer who eats, sleeps, and breathes video games.'
    },
    {
        id: 'nurse_healthcare',
        name: 'Nurses & Healthcare',
        emoji: '🩺',
        demand: 87,
        keywords: ['nurse', 'healthcare', 'nursing', 'medical', 'RN', 'scrubs'],
        prompts: [
            'typography "Nurse Life" with heartbeat line and stethoscope, medical profession pride',
            'cute cartoon nurse superhero with cape flying, kawaii healthcare hero',
            'vintage retro nurse poster style "Saving Lives Since [Year]" classic Americana',
            'stethoscope forming a heart shape with floral elements, elegant nurse design',
            'funny nurse typography "I am a Nurse What is Your Superpower" bold lettering',
            'skeleton wearing nurse scrubs and cap, dark humor medical design'
        ],
        tags: ['nurse', 'nursing', 'RN', 'nurse life', 'healthcare', 'medical', 'nurse gift', 'scrub life', 'stethoscope', 'nurse humor', 'registered nurse', 'nurse appreciation', 'hospital', 'nurse graduation'],
        descTemplate: 'Celebrating the heroes in scrubs. Perfect gift for nurses and healthcare workers.'
    },
    {
        id: 'teacher',
        name: 'Teachers',
        emoji: '📚',
        demand: 85,
        keywords: ['teacher', 'teaching', 'educator', 'school', 'classroom', 'teach'],
        prompts: [
            'typography "Teach Love Inspire" with apple and pencil graphics, teacher appreciation',
            'retro vintage chalkboard style design with "Best Teacher Ever" chalk lettering',
            'colorful school supplies forming a heart shape, vibrant teacher illustration',
            'funny teacher typography "I Teach Therefore I Drink" humorous educator design',
            'rainbow pencils and books stack, modern colorful teacher aesthetic',
            'superhero teacher with cape and book, cartoon illustration educator hero'
        ],
        tags: ['teacher', 'teaching', 'educator', 'teacher gift', 'teacher appreciation', 'school', 'classroom', 'teach', 'teacher life', 'back to school', 'best teacher', 'teacher humor', 'education', 'elementary teacher'],
        descTemplate: 'Celebrate educators with this unique teacher design. Perfect for Teacher Appreciation Day or anytime.'
    },
    {
        id: 'coding_dev',
        name: 'Developers & Coders',
        emoji: '💻',
        demand: 82,
        keywords: ['coding', 'developer', 'programmer', 'code', 'software', 'debug'],
        prompts: [
            'typography "It Works On My Machine" with computer and code brackets, developer humor',
            'binary code forming a skull shape, matrix hacker aesthetic',
            'vintage retro computer terminal with green text, old school programmer vibes',
            'coffee converting to code flowchart diagram, funny programmer illustration',
            'rubber duck debugging illustration with code syntax, cute developer culture',
            'clean modern code brackets with semicolons forming a heart, developer love'
        ],
        tags: ['programmer', 'developer', 'coding', 'software engineer', 'coder gift', 'debugging', 'code', 'tech', 'geek', 'nerd', 'javascript', 'python', 'web developer', 'IT humor'],
        descTemplate: 'For the developer who speaks in code and debugs in their sleep.'
    },
    {
        id: 'plant_parent',
        name: 'Plant Parents',
        emoji: '🌿',
        demand: 80,
        keywords: ['plants', 'plant parent', 'gardening', 'botanical', 'houseplant', 'green'],
        prompts: [
            'cute monstera plant in pot with face and smile, kawaii plant illustration',
            'typography "Plant Lady" with various houseplant illustrations, botanical modern design',
            'vintage botanical illustration of tropical houseplants, scientific drawing style',
            'funny plant typography "Crazy Plant Lady" with surrounding potted plants',
            'minimalist single line drawing of a hand holding a plant, elegant botanical',
            'succulent and cactus collection in geometric pots, modern plant aesthetic'
        ],
        tags: ['plant lover', 'plant parent', 'plant lady', 'plant mom', 'houseplant', 'gardening', 'botanical', 'monstera', 'succulent', 'cactus', 'green thumb', 'plant gift', 'garden', 'plant life'],
        descTemplate: 'For the green thumb who talks to their plants. Celebrate your botanical obsession.'
    },
    {
        id: 'astrology',
        name: 'Astrology & Zodiac',
        emoji: '♈',
        demand: 84,
        keywords: ['astrology', 'zodiac', 'horoscope', 'celestial', 'stars', 'moon'],
        prompts: [
            'celestial zodiac wheel with all 12 signs, mystical cosmic gold and navy design',
            'crescent moon with flowers and stars, celestial boho witchy aesthetic',
            'constellation star map pattern with gold lines on dark navy background',
            'sun and moon kissing illustration, celestial day and night duality design',
            'mystical eye with moon phases inside, esoteric spiritual artwork',
            'vintage tarot card style sun illustration with rays and face, occult aesthetic'
        ],
        tags: ['astrology', 'zodiac', 'horoscope', 'celestial', 'moon', 'stars', 'zodiac signs', 'mystical', 'cosmic', 'spiritual', 'moon phases', 'constellation', 'witchy', 'astrology gift'],
        descTemplate: 'For the spiritually connected stargazer. Mystical celestial design for astrology lovers.'
    },
    {
        id: 'hiking_outdoor',
        name: 'Hiking & Outdoors',
        emoji: '🏔️',
        demand: 86,
        keywords: ['hiking', 'outdoors', 'mountains', 'camping', 'nature', 'adventure'],
        prompts: [
            'mountain landscape inside a circle with pine trees, vintage national park poster style',
            'typography "Adventure Awaits" with mountain silhouette and compass, outdoor explorer',
            'retro sunset with mountain range and forest, 70s vintage outdoor aesthetic',
            'minimalist mountain line art with sunrise, clean outdoor design',
            'bear silhouette filled with mountain landscape, double exposure nature art',
            'campfire scene with tent under stars, cozy camping illustration'
        ],
        tags: ['hiking', 'mountains', 'outdoor', 'camping', 'adventure', 'nature lover', 'wilderness', 'explore', 'hiker', 'national park', 'pine trees', 'trail', 'outdoor life', 'camp'],
        descTemplate: 'For the outdoor adventurer who finds peace in the mountains and trails.'
    },
    {
        id: 'music_producer',
        name: 'Music & Producers',
        emoji: '🎵',
        demand: 79,
        keywords: ['music', 'producer', 'DJ', 'beats', 'studio', 'audio'],
        prompts: [
            'vintage vinyl record with musical notes flying out, retro music lover design',
            'headphones with sound wave equalizer graphics, modern music producer aesthetic',
            'skeleton DJ spinning turntables, dark gothic music artwork',
            'piano keys forming a wave pattern, elegant musical instrument design',
            'cassette tape with colorful retro 80s design, nostalgic music aesthetic',
            'microphone with roses and thorns wrapping around it, artistic music design'
        ],
        tags: ['music', 'musician', 'music producer', 'DJ', 'beats', 'vinyl', 'headphones', 'music lover', 'studio', 'audio', 'hip hop', 'rock', 'jazz', 'music gift'],
        descTemplate: 'For the music obsessed. Whether you make it or just live for it.'
    },
    {
        id: 'mom_life',
        name: 'Mom Life',
        emoji: '👩‍👧',
        demand: 93,
        keywords: ['mom', 'mama', 'mother', 'mom life', 'mama bear', 'motherhood'],
        prompts: [
            'typography "Mama Bear" with cute bear silhouette and cubs, heartwarming mother design',
            'floral wreath surrounding the word "Mom" in elegant script, botanical mother design',
            'funny mom typography "Mama Needs Coffee" with coffee cup, humorous mom life',
            'vintage retro "Best Mom Ever" trophy and ribbon design, classic appreciation',
            'heart made of children handprints, sentimental mother illustration',
            'superhero mom with cape carrying groceries and kids, funny mom cartoon'
        ],
        tags: ['mom', 'mama', 'mother', 'mom life', 'mama bear', 'mom gift', 'mothers day', 'best mom', 'new mom', 'boy mom', 'girl mom', 'momlife', 'motherhood', 'mom birthday'],
        descTemplate: 'Celebrating the hardest job in the world. Perfect gift for any amazing mom.'
    },
    {
        id: 'dad_life',
        name: 'Dad Jokes & Fatherhood',
        emoji: '👨‍👧',
        demand: 89,
        keywords: ['dad', 'father', 'dad joke', 'papa', 'daddy', 'fatherhood'],
        prompts: [
            'typography "Dad Joke Loading..." with progress bar graphic, funny father humor',
            'vintage retro "World Greatest Dad" certificate style design, classic dad appreciation',
            'tools and wrench forming the word DAD, handyman father design',
            'funny "Dadalorian" space warrior dad with baby, sci-fi parody father',
            'BBQ grill master dad with spatula and apron design, summer dad vibes',
            'dad bod typography "Dad Bod: Father Figure" with beer belly silhouette, humor'
        ],
        tags: ['dad', 'father', 'dad joke', 'papa', 'dad gift', 'fathers day', 'best dad', 'new dad', 'daddy', 'dad humor', 'dad life', 'fatherhood', 'dad birthday', 'funny dad'],
        descTemplate: 'For the dad who loves bad jokes and being the best father. Perfect Father\'s Day or birthday gift.'
    },
    {
        id: 'motivational',
        name: 'Motivational Quotes',
        emoji: '🔥',
        demand: 83,
        keywords: ['motivational', 'inspirational', 'hustle', 'grind', 'success', 'mindset'],
        prompts: [
            'bold typography "Stay Hungry Stay Humble" with crown graphic, motivational design',
            'lion head illustration with "Fearless" text, powerful motivation design',
            'sunrise over mountains with "Rise and Grind" bold text, morning motivation',
            'chess king piece with "Think Three Moves Ahead" strategic mindset design',
            'wolf artwork with "Lone Wolf" text, independent spirit motivation',
            'arrow breaking through wall with "Unstoppable" text, breakthrough motivation design'
        ],
        tags: ['motivational', 'inspirational', 'hustle', 'grind', 'success', 'mindset', 'entrepreneur', 'boss', 'motivation', 'inspire', 'never give up', 'stay focused', 'dream big', 'positive vibes'],
        descTemplate: 'Fuel your ambition with this powerful motivational design for go-getters and achievers.'
    }
];

// Export for use in app.js
window.NICHES = NICHES;
