// Advanced Emotion Detection for Romantic Text
const EmotionDetector = {
    // Emotion keywords with weights
    emotions: {
        love: { keywords: ['love', 'darling', 'baby', 'heart', 'forever', 'soulmate', 'mine', 'always'], emoji: '💖', color: '#ff6b6b' },
        passion: { keywords: ['passion', 'desire', 'burning', 'fire', 'crave', 'kiss', 'touch'], emoji: '🔥', color: '#ff4757' },
        sweet: { keywords: ['sweet', 'honey', 'sugar', 'cute', 'adorable', 'beautiful'], emoji: '🍯', color: '#ffa502' },
        romantic: { keywords: ['romantic', 'dream', 'magic', 'destiny', 'fate', 'perfect'], emoji: '✨', color: '#5352ed' },
        longing: { keywords: ['miss', 'need', 'want', 'ache', 'yearn', 'longing'], emoji: '💔', color: '#747d8c' },
        joy: { keywords: ['happy', 'joy', 'bliss', 'ecstasy', 'heaven'], emoji: '😍', color: '#00d2d3' }
    },

    analyze(text) {
        const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
        let scores = {};

        // Initialize scores
        Object.keys(this.emotions).forEach(emotion => {
            scores[emotion] = 0;
        });

        // Count emotion keywords
        words.forEach(word => {
            Object.keys(this.emotions).forEach(emotion => {
                if (this.emotions[emotion].keywords.includes(word)) {
                    scores[emotion] += 1;
                }
            });
        });

        // Find dominant emotion
        let maxScore = 0;
        let dominantEmotion = 'love';
        Object.keys(scores).forEach(emotion => {
            if (scores[emotion] > maxScore) {
                maxScore = scores[emotion];
                dominantEmotion = emotion;
            }
        });

        const intensity = Math.min((maxScore / words.length) * 100 * 2, 100);
        
        return {
            emotion: dominantEmotion,
            score: scores,
            intensity: intensity,
            emoji: this.emotions[dominantEmotion].emoji,
            color: this.emotions[dominantEmotion].color
        };
    }
};