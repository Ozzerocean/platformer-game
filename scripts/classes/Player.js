class Player extends Unit {
    constructor({ 
        collisionObjects = [],
        imageSrc = './img/king/idleRight.png', 
        frameRate = 11, 
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
                            if (level === 2) level = 0;
                            levels[level].update();

                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            player.preventAnimation = false;
                            
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
                    this.preventAnimation = false;
                    this.handleInput(keys);
                }
            },
            attackLeft: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/attackLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput(keys);
                }
            },
            jumpLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/jumpLeft.png'
            },
            jumpRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/jumpRight.png'
            },
            fallLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/fallLeft.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            fallRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/fallRight.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            groundLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/groundLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput(keys);
                }
            },
            groundRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/groundRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput(keys);
                }
            },
            hitLeft: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/hitLeft.png',
                onComplete: () => {
                    this.isHit = false;
                    this.preventAnimation = false;
                    this.handleInput(keys);
                    this.getDamage();
                }
            },
            hitRight: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/hitRight.png',
                onComplete: () => {
                    this.isHit = false;
                    this.preventAnimation = false;
                    this.handleInput(keys);
                    this.getDamage();
                }
            },
            deadLeft: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/king/deadLeft.png',
                onComplete: () => {
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            levels[level].update();

                            this.isDying = false;
                            this.preventInput = false;
                            this.preventAnimation = false;

                            this.health = 3;
                            healthbar.initHearts();

                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                }
            },
            deadRight: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/king/deadRight.png',
                onComplete: () => {
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            levels[level].update();

                            this.isDying = false;
                            this.preventInput = false;
                            this.preventAnimation = false;

                            this.health = 3;
                            healthbar.initHearts();

                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                }
            },
        }, 
        loop, 
        autoplay
    }) {
        super({ collisionObjects, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})
        this.position = {
            x: 64 * 3,
            y: 64 * 4
        }

        this.health = 3;
        this.isHit = false;
        this.isDying = false;
        this.lastDirection = 'right';
        this.preventInput = false;
        this.preventAnimation = false;
    }

    getDamage() {
        if (this.health > 0) this.health--
        if (this.health == 0) {
            if (this.isDying) return;
            this.isDying = true;
            this.preventInput = true;
            this.preventAnimation = true;
            this.velocity.x = 0;

            if (this.lastDirection === 'left') this.switchSprite('deadLeft')
            else if (this.lastDirection === 'right') this.switchSprite('deadRight');
        }
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

        // c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        // c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        // c.fillRect(player.damagebox.position.x, player.damagebox.position.y, player.damagebox.width, player.damagebox.height);
    }

    handleInput(keys) {
        this.velocity.x = 0;

        if (!this.preventInput) {
            if (player.currentAnimation) player.currentAnimation.isActive = false;

            if (keys.d.pressed) this.velocity.x = 3;
            else if (keys.a.pressed) this.velocity.x = -3;
        } 

        if (this.preventAnimation) return;

        if (this.velocity.y == 0) {
            if (player.currentAnimation) player.currentAnimation.isActive = false;

            if (this.isFalling) {
                if (keys.d.pressed) {
                    this.switchSprite('groundRight');
                    this.lastDirection = 'right'
                } else if (keys.a.pressed) {
                    this.lastDirection = 'left'
                    this.switchSprite('groundLeft');
                } else {
                    if (this.lastDirection === 'right') this.switchSprite('groundRight')
                    else this.switchSprite('groundLeft');
                }

                return; 
            } 

            if (keys.d.pressed) {
                this.switchSprite('runRight');
                this.lastDirection = 'right'
            } else if (keys.a.pressed) {
                this.lastDirection = 'left'
                this.switchSprite('runLeft');
            } else {
                if (this.lastDirection === 'right') this.switchSprite('idleRight')
                else this.switchSprite('idleLeft');
            }    
        } else if (this.velocity.y < 0) {
            if (keys.d.pressed) {
                this.switchSprite('jumpRight');
                this.lastDirection = 'right'
            } else if (keys.a.pressed) {
                this.lastDirection = 'left'
                this.switchSprite('jumpLeft');
            } else {
                if (this.lastDirection === 'right') this.switchSprite('jumpRight')
                else this.switchSprite('jumpLeft');
            }
        } else if (this.velocity.y > 0) {
            if (keys.d.pressed) {
                this.switchSprite('fallRight');
                this.lastDirection = 'right'
            } else if (keys.a.pressed) {
                this.lastDirection = 'left'
                this.switchSprite('fallLeft');
            } else {
                if (this.lastDirection === 'right') this.switchSprite('fallRight')
                else this.switchSprite('fallLeft');
            }
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

    checkDamage(pig) {
        if (this.hitbox.position.x <= pig.damagebox.position.x + pig.damagebox.width &&
            this.hitbox.position.x + this.hitbox.width >= pig.damagebox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= pig.damagebox.position.y &&
            this.hitbox.position.y <= pig.damagebox.position.y + pig.damagebox.height
        ) {
            if (this.isDying || this.isHit) return;
            this.isFalling = false;
            this.isHit = true;
            this.preventAnimation = true;
            
            if (this.lastDirection === 'left') this.switchSprite('hitLeft') 
            else if (this.lastDirection === 'right') this.switchSprite('hitRight');
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

    checkVerticalPigsCollision(pigs) {
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

