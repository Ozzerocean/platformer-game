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
            attackRight: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/attackRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
                }
            },
            attackLeft: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/king/attackLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
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
                    this.handleInput();
                }
            },
            groundRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/king/groundRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput();
                }
            },
            hitLeft: {
                frameRate: 2,
                loop: false,
                imageSrc: './img/king/hitLeft.png',
                onComplete: () => {
                    this.isHit = false;
                    this.preventAnimation = false;
                    this.preventInput = false;
                    this.handleInput();
                    this.getDamage();
                }
            },
            hitRight: {
                frameRate: 2,
                loop: false,
                imageSrc: './img/king/hitRight.png',
                onComplete: () => {
                    this.isHit = false;
                    this.preventAnimation = false;
                    this.preventInput = false;
                    this.handleInput();
                    this.getDamage();
                }
            },
            deadLeft: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/king/deadLeft.png',
                onComplete: () => {
                    gsap.to(this.overlay, {
                        opacity: 0,
                        onComplete: () => {
                            gsap.to(overlay, {
                                opacity: 1,
                                onComplete: () => {
                                    this.overlay.opacity = 1;

                                    doorOut = undefined;

                                    level = 0;
                                    initLevels();
                                    levels[level].update();
        
                                    this.isDying = false;
                                    this.isDyingGrounded = false;
                                    this.preventInput = false;
                                    this.preventAnimation = false;
        
                                    this.health = 3;
                                    healthbar.initHearts();

                                    diamondbar.count = 0;
                                    diamondbar.initNumbers();
        
                                    gsap.to(overlay, {
                                        opacity: 0
                                    })
                                }
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
                    gsap.to(this.overlay, {
                        opacity: 0,
                        onComplete: () => {
                            gsap.to(overlay, {
                                opacity: 1,
                                onComplete: () => {
                                    this.overlay.opacity = 1;
                                    
                                    doorOut = undefined;

                                    level = 0;
                                    initLevels();
                                    levels[level].update();
                                    
                                    this.isDying = false;
                                    this.isDyingGrounded = false;
                                    this.preventInput = false;
                                    this.preventAnimation = false;
        
                                    this.health = 3;
                                    healthbar.initHearts();

                                    diamondbar.count = 0;
                                    diamondbar.initNumbers();
        
                                    gsap.to(overlay, {
                                        opacity: 0
                                    })
                                }
                            })
                        }
                    })
                }
            },
            doorInRight: {
                frameRate: 8,
                loop: false,
                imageSrc: './img/king/doorInRight.png',
                onComplete: () => {
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level = doorOut.level;
                            levels[level].update();
                            this.position.x = doorOut.position.x - player.width / 2 + doorOut.width / 2;
                            this.position.y = doorOut.position.y - 15.01;

                            doorIn.switchSprite('idle');

                            this.sounds.doorOut.play();
                            this.switchSprite('doorOutRight');

                            doorOut.sounds.closing.play();
                            doorOut.switchSprite('closing');
                            
                            gsap.to(overlay, {
                                opacity: 0,
                                onComplete: () => {
                                    this.play();
                                    doorOut.play();
                                }
                            })
                        }
                    })
                }
            },
            doorInLeft: {
                frameRate: 8,
                loop: false,
                imageSrc: './img/king/doorInLeft.png',
                onComplete: () => {
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level = doorOut.level;
                            levels[level].update();
                            this.position.x = doorOut.position.x - this.width / 2 + doorOut.width / 2;
                            this.position.y = doorOut.position.y - 15.01;

                            doorIn.switchSprite('idle');

                            this.sounds.doorOut.play();
                            this.switchSprite('doorOutLeft');

                            doorOut.sounds.closing.play();
                            doorOut.switchSprite('closing');
                            
                            gsap.to(overlay, {
                                opacity: 0,
                                onComplete: () => {
                                    this.play();
                                    doorOut.play();
                                }
                            })
                        }
                    })
                }
            },
            doorOutRight: {
                frameRate: 8,
                loop: false,
                autoplay: false,
                imageSrc: './img/king/doorOutRight.png',
                onComplete: () => {
                    this.preventInput = false;
                    this.preventAnimation = false;
                    this.enteringDoor = false;
                }
            },
            doorOutLeft: {
                frameRate: 8,
                loop: false,
                autoplay: false,
                imageSrc: './img/king/doorOutLeft.png',
                onComplete: () => {
                    this.preventInput = false;
                    this.preventAnimation = false;
                    this.enteringDoor = false;
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
        
        this.overlay = {
            opacity: 1
        }

        this.toJump = false;
        this.toAttack = false;
        this.lastAttackTime = Date.now();

        this.health = 3;
        this.isHit = false;
        this.isDying = false;
        this.lastDirection = 'right';
        this.preventInput = false;
        this.preventAnimation = false;

        this.keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            d: {
                pressed: false
            }
        }

        this.sounds = {
            run: new Sound('./audio/player/run.wav'),
            jump: new Sound('./audio/player/jump.wav'),
            ground: new Sound('./audio/player/ground.wav'),
            attack: new Sound('./audio/player/attack.wav'),
            hit: new Sound('/audio/player/hit.wav'),
            damaged: new Sound('./audio/player/damaged.wav'),
            deadGround: new Sound('./audio/player/deadGround.wav'),
            doorIn: new Sound('./audio/player/doorIn.wav'),
            doorOut: new Sound('./audio/player/doorOut.wav'),
            pickUp: new Sound('./audio/player/pickUp.wav'),
        }

        this.updateHitbox();
        this.updateDamagebox();
    }

    getDamage() {
        this.sounds.damaged.play();

        if (this.health > 0) this.health--
        if (this.health == 0) {
            if (this.isDying) return;
            this.isDying = true;
            this.preventInput = true;
            this.preventAnimation = true;
            this.velocity.x = 0;

            this.lastPigHit.switchDialogue('loser');

            if (this.lastPigHit.lastDirection === 'right') this.switchSprite('deadLeft')
            else if (this.lastPigHit.lastDirection === 'left') this.switchSprite('deadRight');
        }
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalUnitsCollision();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalUnitsCollision();
        this.checkVerticalCollisions();

        this.updateDamagebox();

        // c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        // c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        // c.fillRect(player.damagebox.position.x, player.damagebox.position.y, player.damagebox.width, player.damagebox.height);
    }

    handleInput() {
        if (!this.isHit) this.velocity.x = 0;

        if (this.isDying && this.velocity.y == 0 && !this.isDyingGrounded) {
            this.isDyingGrounded = true;
            this.sounds.deadGround.play();
        }

        if (!this.preventInput) {
            if (this.currentAnimation) this.currentAnimation.isActive = false;

            if (this.velocity.y == 0 && this.toJump) {
                if (Date.now() - this.pressJumpTime < 150) {
                    this.velocity.y = -10.5;
                    this.sounds.jump.play();
                }
                this.toJump = false;
            }

            if (this.toAttack) {
                const now = Date.now();
                if (now - this.pressAttackTime < 150) {
                    if (now - player.lastAttackTime > 300) {
                        this.toAttack = false;
                        player.lastAttackTime = now;
                        player.preventAnimation = true;

                        pigs.forEach((pig) => pig.checkDamage());

                        this.sounds.attack.play();
                        if (player.lastDirection === "right") player.switchSprite('attackRight')
                        else if (player.lastDirection === "left") player.switchSprite('attackLeft');
                    }
                } else {
                    this.toAttack = false;
                }
            }

            if (this.keys.d.pressed) this.velocity.x = 3;
            else if (this.keys.a.pressed) this.velocity.x = -3;
        } 

        if (this.preventAnimation) return;

        if (this.velocity.y == 0) {
            if (this.currentAnimation) this.currentAnimation.isActive = false;

            if (this.isFalling) {
                if (this.keys.d.pressed) {
                    this.switchSprite('groundRight');
                    this.lastDirection = 'right'
                } else if (this.keys.a.pressed) {
                    this.lastDirection = 'left'
                    this.switchSprite('groundLeft');
                } else {
                    if (this.lastDirection === 'right') this.switchSprite('groundRight')
                    else this.switchSprite('groundLeft');
                }

                this.sounds.ground.play();

                return; 
            } 

            if (this.keys.d.pressed) {
                this.sounds.run.playedKeyD = true;

                if (this.sounds.run.playedKeyA) {
                    this.sounds.run.playedKeyA = false;
                    this.sounds.run.switched = true;
                }

                this.sounds.run.play();

                this.switchSprite('runRight');
                this.lastDirection = 'right'
            } else if (this.keys.a.pressed) {
                this.sounds.run.playedKeyA = true;

                if (this.sounds.run.playedKeyD) {
                    this.sounds.run.playedKeyD = false;
                    this.sounds.run.switched = true;
                }

                this.sounds.run.play();

                this.lastDirection = 'left'
                this.switchSprite('runLeft');
            } else {
                if (this.lastDirection === 'right') this.switchSprite('idleRight')
                else this.switchSprite('idleLeft');
            }    
        } else if (this.velocity.y < 0) {
            if (this.keys.d.pressed) {
                this.switchSprite('jumpRight');
                this.lastDirection = 'right'
            } else if (this.keys.a.pressed) {
                this.lastDirection = 'left'
                this.switchSprite('jumpLeft');
            } else {
                if (this.lastDirection === 'right') this.switchSprite('jumpRight')
                else this.switchSprite('jumpLeft');
            }
        } else if (this.velocity.y > 0) {
            if (this.keys.d.pressed) {
                this.switchSprite('fallRight');
                this.lastDirection = 'right'
            } else if (this.keys.a.pressed) {
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
                width: 72 + 25,
                height: 28 + this.hitbox.height + 18
            }
        } else if (this.lastDirection === "left") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x - 72,
                    y: this.hitbox.position.y - 28
                },
                width: 72 + 25,
                height: 28 + this.hitbox.height + 18
            }
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
            this.width,
            this.height
        );
        c.restore();

        this.updateFrames();
    }

    checkDamage(pig) {
        if (this.hitbox.position.x <= pig.damagebox.position.x + pig.damagebox.width &&
            this.hitbox.position.x + this.hitbox.width >= pig.damagebox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= pig.damagebox.position.y &&
            this.hitbox.position.y <= pig.damagebox.position.y + pig.damagebox.height
        ) {
            if (this.isDying || this.isHit || this.enteringDoor) return;
            this.isFalling = false;
            this.isHit = true;
            this.preventAnimation = true;
            this.preventInput = true;

            this.velocity.y = this.knockbackVelocity.y;
            if (pig.lastDirection == "left") this.velocity.x = -this.knockbackVelocity.x;
            else if (pig.lastDirection = "right") this.velocity.x = this.knockbackVelocity.x;
            
            this.sounds.hit.play();
            if (this.lastDirection === 'left') this.switchSprite('hitLeft') 
            else if (this.lastDirection === 'right') this.switchSprite('hitRight');
        }
    }

    checkHorizontalUnitsCollision() {
        // for(let i = 0; i < pigs.length; i++) {
        //     const pig = pigs[i];
        //     if (pig.isDying) continue;

        //     if (this.hitbox.position.x <= pig.hitbox.position.x + pig.hitbox.width &&
        //         this.hitbox.position.x + this.hitbox.width >= pig.hitbox.position.x &&
        //         this.hitbox.position.y + this.hitbox.height >= pig.hitbox.position.y &&
        //         this.hitbox.position.y <= pig.hitbox.position.y + pig.hitbox.height
        //     ) {
        //         if (this.velocity.x < 0) {
        //             const offset = this.hitbox.position.x - this.position.x;
        //             this.position.x = pig.hitbox.position.x + pig.hitbox.width - offset + 0.01;
        //             break;
        //         }

        //         if (this.velocity.x > 0) {
        //             const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
        //             this.position.x = pig.hitbox.position.x - offset - 0.01;
        //             break;
        //         }
        //     }
        // }

        for(let i = 0; i < cannons.length; i++) {
            const cannon = cannons[i];

            if (this.hitbox.position.x <= cannon.hitbox.position.x + cannon.hitbox.width &&
                this.hitbox.position.x + this.hitbox.width >= cannon.hitbox.position.x &&
                this.hitbox.position.y + this.hitbox.height >= cannon.hitbox.position.y &&
                this.hitbox.position.y <= cannon.hitbox.position.y + cannon.hitbox.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = cannon.hitbox.position.x + cannon.hitbox.width - offset + 0.01;
                    break;
                }

                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = cannon.hitbox.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }

    checkVerticalUnitsCollision() {
        // for(let i = 0; i < pigs.length; i++) {
        //     const pig = pigs[i];
        //     if (pig.isDying) continue;

        //     if (this.hitbox.position.x <= pig.hitbox.position.x + pig.hitbox.width &&
        //         this.hitbox.position.x + this.hitbox.width >= pig.hitbox.position.x &&
        //         this.hitbox.position.y + this.hitbox.height >= pig.hitbox.position.y &&
        //         this.hitbox.position.y <= pig.hitbox.position.y + pig.hitbox.height
        //     ) {
        //         if (this.velocity.y < 0) {
        //             this.velocity.y = 0;

        //             const offset = this.hitbox.position.y - this.position.y;
        //             this.position.y = pig.hitbox.position.y + pig.hitbox.height - offset + 0.01;
        //             break;
        //         }

        //         if (this.velocity.y > 0) {
        //             this.velocity.y = 0;

        //             const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
        //             this.position.y = pig.hitbox.position.y - offset - 0.01;
        //             break;
        //         }
        //     }
        // }

        for(let i = 0; i < cannons.length; i++) {
            const cannon = cannons[i];

            if (this.hitbox.position.x <= cannon.hitbox.position.x + cannon.hitbox.width &&
                this.hitbox.position.x + this.hitbox.width >= cannon.hitbox.position.x &&
                this.hitbox.position.y + this.hitbox.height >= cannon.hitbox.position.y &&
                this.hitbox.position.y <= cannon.hitbox.position.y + cannon.hitbox.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = cannon.hitbox.position.y + cannon.hitbox.height - offset + 0.01;
                    break;
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = cannon.hitbox.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}

