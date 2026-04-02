class LoveVideoGenerator {
    constructor() {
        this.canvas = document.getElementById('loveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = new LoveParticles(document.getElementById('particles'));
        this.init();
    }

    init() {
        // Real-time emotion detection
        const textArea = document.getElementById('loveText');
        textArea.addEventListener('input', (e) => {
            this.detectEmotion(e.target.value);
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateVideo();
        });

        // Controls
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadVideo();
        });

        document.getElementById('regenerateBtn').addEventListener('click', () => {
            this.generateVideo();
        });

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    detectEmotion(text) {
        if (!text.trim()) return;
        
        const emotion = EmotionDetector.analyze(text);
        document.getElementById('emotionIcon').textContent = emotion.emoji;
        document.getElementById('emotionText').textContent = `Emotion: ${emotion.emotion.toUpperCase()}`;
        document.getElementById('emotionScore').textContent = `Intensity: ${Math.round(emotion.intensity)}%`;
        
        // Color theme based on emotion
        document.querySelector('.emotion-display').style.background = `linear-gradient(135deg, ${emotion.color}, ${this.lightenColor(emotion.color)})`;
    }

    lightenColor(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `rgb(${r + 50},${g + 50},${b + 50})`;
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth * 2;
        this.canvas.height = 500 * 2;
        this.ctx.scale(2, 2);
    }

    async generateVideo() {
        const text = document.getElementById('loveText').value;
        if (!text.trim()) {
            alert('Please write your love message first! 💕');
            return;
        }

        // Show video section
        document.getElementById('videoSection').style.display = 'block';
        document.getElementById('generateBtn').textContent = '🎥 Generating Magic...';

        const emotion = EmotionDetector.analyze(text);
        await this.createRomanticAnimation(text, emotion);
        
        document.getElementById('generateBtn').textContent = '✨ Create New Video';
        this.particles.start();

        // Celebration confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    async createRomanticAnimation(text, emotion) {
        const words = text.split(' ');
        let wordIndex = 0;
        const totalDuration = 8000; // 8 seconds
        const wordDuration = totalDuration / words.length;

        return new Promise((resolve) => {
            let startTime = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;

                // Clear canvas
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width/2, this.canvas.height/2);

                // Romantic gradient background
                const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width/2, this.canvas.height/2);
                gradient.addColorStop(0, emotion.color);
                gradient.addColorStop(1, this.lightenColor(emotion.color));
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(0, 0, this.canvas.width/2, this.canvas.height/2);

                // Floating hearts
                this.drawFloatingHearts(emotion.color);

                // Animate text
                if (elapsed < totalDuration) {
                    const currentWordIndex = Math.floor(elapsed / wordDuration);
                    
                    // Show words one by one with romantic effects
                    for (let i = 0; i <= currentWordIndex; i++) {
                        this.drawRomanticText(words[i], i * 80 + 100, 250 + Math.sin(elapsed * 0.01 + i) * 20, emotion);
                    }

                    requestAnimationFrame(animate);
                } else {
                    // Final romantic explosion
                    this.romanticExplosion(emotion.color);
                    setTimeout(resolve, 2000);
                }
            };

            requestAnimationFrame(animate);
        });
    }

    drawFloatingHearts(color) {
        const time = Date.now() * 0.005;
        for (let i = 0; i < 10; i++) {
            const x = (this.canvas.width/4) + Math.sin(time + i) * 100;
            const y = (this.canvas.height/4) + Math.cos(time * 0.7 + i) * 50;
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.6 + Math.sin(time * 2 + i) * 0.4;
            this.ctx.font = '30px Arial';
            this.ctx.fillStyle = color;
            this.ctx.fillText('💖', x, y);
            this.ctx.restore();
        }
    }

    drawRomanticText(word, x, y, emotion) {
        this.ctx.save();
        this.ctx.font = 'bold 48px Dancing Script, cursive';
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = emotion.color;
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(word, x, y);
        this.ctx.shadowColor = emotion.color;
        this.ctx.shadowBlur = 20;
        this.ctx.fillText(word, x, y);
        this.ctx.restore();
    }

    romanticExplosion