class Player extends Unit {
    constructor({ 
        collisionBlocks = [],
        imageSrc, 
        frameRate, 
        frameBuffer, 
        animations = {
            idleRight: {
                frameRate: 11,
                loop: true,
                imageSrc: './img/king/idleRight.png'
            },
            idleLeft: {
                frameRate: 11,
                loop: true,
                imageSrc: './img/king/idleLeft.png'
            },
            runRight: {
                frameRate: 8,
                loop: true,
                imageSrc: './img/king/runRight.png'
            },
            runLeft: {
                frameRate: 8,
                loop: true,
                imageSrc: './img/king/runLeft.png'
            },
            doorIn: {
                frameRate: 8,
                loop: false,
                imageSrc: './img/king/doorIn.png',
                onComplete: () => {
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level++;
                            if (level === 4) level = 1;
                            levels[level].init();
                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                }
            },
            attackRight: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/attackRight.png',
                onComplete: () => {
                    player.preventInput = false;
                    player.handleInput(keys);
                    pigs.forEach((pig) => pig.checkDamage());
                }
            },
            attackLeft: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/attackLeft.png',
                onComplete: () => {
                    player.preventInput = false;
                    player.handleInput(keys);
                    pigs.forEach((pig) => pig.checkDamage());
                }
            },
        }, 
        loop, 
        autoplay
    }) {
        super({ collisionBlocks, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})
        this.position = {
            x: 64 * 3,
            y: 64 * 4
        }

        this.lastDirection = 'right';
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalPigsCollision(pigs);
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalPigsCollision(pigs);
        this.checkVerticalCollisions();

        this.updateDamagebox();

        c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        c.fillRect(player.damagebox.position.x, player.damagebox.position.y, player.damagebox.width, player.damagebox.height);
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

        this.updateFrames();
    }

    handleInput(keys) {
        if (this.preventInput) return;

        if (player.currentAnimation) player.currentAnimation.isActive = false;

        this.velocity.x = 0;
        if (keys.d.pressed) {
            this.velocity.x = 3;
            this.switchSprite('runRight');
            this.lastDirection = 'right'
        } else if (keys.a.pressed) {
            this.velocity.x = -3;
            this.lastDirection = 'left'
            this.switchSprite('runLeft');
        } else {
            if (this.lastDirection === 'right') this.switchSprite('idleRight')
            else this.switchSprite('idleLeft');
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 74,
                y: this.position.y + 74
            },
            width: 45,
            height: 53
        }
    }

    updateDamagebox() {
        if (this.lastDirection === "right") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x + this.hitbox.width - 25,
                    y: this.hitbox.position.y - 28
                },
                width: 64 + 25,
                height: 28 + this.hitbox.height
            }
        } else if (this.lastDirection === "left") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x - 64,
                    y: this.hitbox.position.y - 28
                },
                width: 64 + 25,
                height: 28 + this.hitbox.height
            }
        }
        
    }

    checkHorizontalPigsCollision(pigs) {
        for(let i = 0; i < pigs.length; i++) {
            const pig = pigs[i];
            if (pig.isDying) continue;

            if (this.hitbox.position.x <= pig.hitbox.position.x + pig.hitbox.width &&
                this.hitbox.position.x + this.hitbox.width >= pig.hitbox.position.x &&
                this.hitbox.position.y + this.hitbox.height >= pig.hitbox.position.y &&
                this.hitbox.position.y <= pig.hitbox.position.y + pig.hitbox.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = pig.hitbox.position.x + pig.hitbox.width - offset + 0.01;
                    break;
                }

                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = pig.hitbox.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }

    checkVerticalPigsCollision() {
        for(let i = 0; i < pigs.length; i++) {
            const pig = pigs[i];
            if (pig.isDying) continue;

            if (this.hitbox.position.x <= pig.hitbox.position.x + pig.hitbox.width &&
                this.hitbox.position.x + this.hitbox.width >= pig.hitbox.position.x &&
                this.hitbox.position.y + this.hitbox.height >= pig.hitbox.position.y &&
                this.hitbox.position.y <= pig.hitbox.position.y + pig.hitbox.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = pig.hitbox.position.y + pig.hitbox.height - offset + 0.01;
                    break;
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = pig.hitbox.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}

