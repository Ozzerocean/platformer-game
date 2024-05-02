class Pig extends Unit {
    constructor({ 
        collisionObjects = [], 
        position,
        lastDirection, 
        imageSrc, 
        frameRate, 
        frameBuffer, 
        animations = {
            idleRight: {
                frameRate: 11,
                loop: true,
                imageSrc: './img/pigs/idleRight.png'
            },
            idleLeft: {
                frameRate: 11,
                loop: true,
                imageSrc: './img/pigs/idleLeft.png'
            },
            hitLeft: {
                frameRate: 2,
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
            },
            attackLeft: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/attackLeft.png',
                onComplete: () => {
                    this.switchSprite("idleLeft");
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            },
            attackRight: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/attackRight.png',
                onComplete: () => {
                    this.switchSprite("idleRight");
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            }
        },
        loop, 
        autoplay
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.isHit = false;
        this.idDying = false;
        this.isDead = false;
        this.overlay = {
            opacity: 1
        };
        this.lastDirection = lastDirection;

        this.isTimed = false;
        this.time;
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();

        this.updateDamagebox();

        // c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        // c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        // c.fillRect(this.damagebox.position.x, this.damagebox.position.y, this.damagebox.width, this.damagebox.height);
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

    updateDamagebox() {
        if (this.lastDirection === "right") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x + this.hitbox.width - 15,
                    y: this.hitbox.position.y - 23
                },
                width: 30 + 15,
                height: 23 + this.hitbox.height
            }
        } else if (this.lastDirection === "left") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x - 25,
                    y: this.hitbox.position.y - 23
                },
                width: 30 + 15,
                height: 23 + this.hitbox.height
            }
        }
    }

    checkDamage() {
        if (this.hitbox.position.x <= player.damagebox.position.x + player.damagebox.width &&
            this.hitbox.position.x + this.hitbox.width >= player.damagebox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= player.damagebox.position.y &&
            this.hitbox.position.y <= player.damagebox.position.y + player.damagebox.height
        ) {
            if (this.isDying || this.isHit) return;
            this.isHit = true;

            if (this.lastDirection === 'left') this.switchSprite('hitLeft')
            else if (this.lastDirection === 'right') this.switchSprite('hitRight');
        }
    }

    checkAttackOpportunity() {
        if (player.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
            player.hitbox.position.x + player.hitbox.width >= this.damagebox.position.x &&
            player.hitbox.position.y + player.hitbox.height >= this.damagebox.position.y &&
            player.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
        ) {
            if(this.isHit || this.isDying) return;

            if (!this.isTimed) {
                this.isTimed = true;
                this.time = new Date();
            }

            const now = new Date();
            if (now - this.time > 250) {
                if (this.lastDirection === 'right') this.switchSprite('attackRight')
                else if (this.lastDirection === 'left') this.switchSprite('attackLeft')
                
                player.checkDamage(this);
                this.time.setSeconds(this.time.getSeconds() + 1)
            }
            
        } else {
            const now = new Date();
            if (now - this.date > 300) this.isTimed = false;
        }
    }

    draw() {
        if (this.isDead) return;
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
            this.width,
            this.height
        );
        c.restore();

        this.updateFrames();
    }
}