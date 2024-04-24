class Pig extends Unit {
    constructor({ 
        collisionBlocks = [], 
        position,
        lastDirection, 
        imageSrc, 
        frameRate, 
        frameBuffer, 
        animations = {
            idleRight: {
                frameRate: 11,
                frameBuffer: 7,
                loop: true,
                imageSrc: './img/pigs/idleRight.png'
            },
            idleLeft: {
                frameRate: 11,
                frameBuffer: 7,
                loop: true,
                imageSrc: './img/pigs/idleLeft.png'
            },
            hitLeft: {
                frameRate: 2,
                frameBuffer: 7,
                loop: false,
                imageSrc: './img/pigs/hitLeft.png',
                onComplete: () => {
                    if(!this.isDying) {
                        this.isDying = true;
                        this.switchSprite('deadLeft');
                    }
                }
            },
            hitRight: {
                frameRate: 2,
                frameBuffer: 7,
                loop: false,
                imageSrc: './img/pigs/hitRight.png',
                onComplete: () => {
                    if(!this.isDying) {
                        this.isDying = true;
                        this.switchSprite('deadRight');
                    }
                }
            },
            deadLeft: {
                frameRate: 4,
                frameBuffer: 7,
                loop: false,
                imageSrc: './img/pigs/deadLeft.png',
                onComplete: () => {
                    gsap.to(this.overlay, {
                        opacity: 0,
                        onComplete: () => {
                            this.isDead = true;
                        }
                    })
                }
            },
            deadRight: {
                frameRate: 4,
                frameBuffer: 7,
                loop: false,
                imageSrc: './img/pigs/deadRight.png',
                onComplete: () => {
                    gsap.to(this.overlay, {
                        opacity: 0,
                        onComplete: () => {
                            this.isDead = true;
                        }
                    })
                }
            }
        },
        loop, 
        autoplay
    }) {
        super({ collisionBlocks, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.idDying = false;
        this.isDead = false;
        this.overlay = {
            opacity: 1
        };
        this.lastDirection = lastDirection;
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 61,
                y: this.position.y + 60
            },
            width: 38,
            height: 35
        }
    }

    checkDamage() {
        if (this.hitbox.position.x <= player.damagebox.position.x + player.damagebox.width &&
            this.hitbox.position.x + this.hitbox.width >= player.damagebox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= player.damagebox.position.y &&
            this.hitbox.position.y <= player.damagebox.position.y + player.damagebox.height
        ) {
            if (this.lastDirection === 'left' && !this.isDying) this.switchSprite('hitLeft')
            else if (this.lastDirection === 'right' && !this.isDying) this.switchSprite('hitRight');
        }
    }

    draw() {
        if(!this.loaded) return;

        const cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height
        }

        c.save();
        c.globalAlpha = this.overlay.opacity;
        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width * 2,
            this.height * 2
        );
        c.restore();

        this.updateFrames();
    }
}