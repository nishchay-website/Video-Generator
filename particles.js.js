class LoveParticles {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
    }

    createHeart(x, y, size = 1) {
        const hearts = ['💖', '💕', '💗', '💝', '🌹'];
        return {
            x, y, size,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            heart: hearts[Math.floor(Math.random() * hearts.length)]
        };
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create new particles randomly
        if (Math.random() < 0.3) {
            this.particles.push(this.createHeart(
                Math.random() * this.canvas.width,
                this.canvas.height
            ));
        }

        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
            particle.size *= 0.99;

            if (particle.life > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = particle.life;
                this.ctx.font = `${particle.size * 20}px Arial`;
                this.ctx.fillText(particle.heart, particle.x, particle.y);
                this.ctx.restore();
                return true;
            }
            return false;
        });

        this.animationId = requestAnimationFrame(() => this.update());
    }

    start() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.update();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}