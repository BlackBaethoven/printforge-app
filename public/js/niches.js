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
            'funny coffee typography saying "But First Coffee" with steam rising from a coffee cup, bold retro lettering',
            'cute kawaii cartoon coffee cup character with sleepy eyes and steam, adorable illustration',
            'vintage retro coffee shop poster style design with coffee beans and grinder, distressed texture',
            'minimalist line art drawing of hands holding a coffee mug, continuous single line style',
            'skull made of coffee beans and steam, dark gothic coffee lover aesthetic',
            'astronaut floating in space drinking coffee from a mug, cosmic vibes'
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
            'cute cartoon cat wearing sunglasses giving a thumbs up, kawaii style illustration',
            'typography design "Cat Mom" with paw prints and cat silhouette, modern bold lettering',
            'black cat sitting on a stack of books with moon in background, witchy aesthetic',
            'group of cats forming a heart shape, watercolor style illustration',
            'vintage retro style cat portrait like a renaissance painting, regal feline',
            'geometric low-poly cat face design, modern abstract art style'
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
            'cute golden retriever puppy face illustration, adorable cartoon style with big eyes',
            'typography "Dog Mom" with paw print replacing the O, floral accents, modern design',
            'cool dog wearing a bandana and sunglasses, hipster illustration style',
            'vintage retro sunset with dog silhouette, 80s aesthetic outdoors vibe',
            'anatomical heart made of dog paw prints, meaningful tattoo style design',
            'group of different dog breeds sitting together, colorful cartoon illustration'
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
            'bold typography "No Pain No Gain" with lightning bolt graphics, aggressive gym motivation',
            'skeleton lifting heavy barbell deadlift, dark gothic gym artwork',
            'retro vintage bodybuilder flexing in sunset circle, 80s aesthetic gym poster',
            'minimalist dumbbell and barbell crossed design, clean gym logo style',
            'spartan helmet with weights, warrior mentality gym design',
            'funny gym typography "I Workout Because I Really Like Food" humorous fitness'
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
            'retro pixel art game controller with "Player 1" text, classic arcade aesthetic',
            'skull wearing gaming headset with neon glow, dark gamer aesthetic',
            'funny typography "I Paused My Game To Be Here" sarcastic gamer humor',
            'vintage 80s arcade machine with neon lights, synthwave retro gaming',
            'health bar and XP bar design with "Low On Sleep" text, gamer humor',
            'controller made of circuit board patterns, tech and gaming fusion design'
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
