class Pig extends Unit {
    constructor({ 
        collisionObjects = [], 
        position,
        lastDirection = 'left', 
        imageSrc = './img/pigs/idleRight.png', 
        frameRate = 11, 
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
            runRight: {
                frameRate: 6,
                loop: true,
                imageSrc: './img/pigs/runRight.png'
            },
            runLeft: {
                frameRate: 6,
                loop: true,
                imageSrc: './img/pigs/runLeft.png'
            },
            attackLeft: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/attackLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            },
            attackRight: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/attackRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            },
            jumpLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/jumpLeft.png'
            },
            jumpRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/jumpRight.png'
            },
            fallLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/fallLeft.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            fallRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/fallRight.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            groundLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/groundLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput();
                }
            },
            groundRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/groundRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput();
                }
            },
            hitLeft: {
                frameRate: 2,
                frameBuffer: 10,
                loop: false,
                imageSrc: './img/pigs/hitLeft.png',
                onComplete: () => {
                    this.sounds.damaged.play();

                    this.velocity.x = 0;
                    if(!this.isDying) {
                        this.isDying = true;
                        this.switchSprite('deadLeft');
                    }
                }
            },
            hitRight: {
                frameRate: 2,
                frameBuffer: 10,
                loop: false,
                imageSrc: './img/pigs/hitRight.png',
                onComplete: () => {
                    this.sounds.damaged.play();

                    this.velocity.x = 0;
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
        },
        loop, 
        autoplay
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.updateHitbox();
        this.updateDamagebox();

        this.dialogues = {
            left: new Dialogue({ unit: this, type: 'left' }),
            right: new Dialogue({ unit: this, type: 'right' })
        }
        this.preventDialogue = {
            left: false,
            right: false
        }

        this.previousPosition = +this.position.x;

        this.isHit = false;
        this.idDying = false;
        this.isDead = false;

        this.overlay = {
            opacity: 1
        };

        this.lastDirection = lastDirection;
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
        this.speed = 2.3;

        // this.sounds = {
        //     run: new Sound(buffers.pig.run),
        //     ground: new Sound(buffers.pig.ground),
        //     attack: new Sound(buffers.pig.attack),
        //     hit: new Sound(buffers.pig.hit),
        //     damaged: new Sound(buffers.pig.damaged),
        // }

        this.sounds = {
            run: new Sound('./audio/pig/run.wav'),
            ground: new Sound('./audio/pig/ground.wav'),
            attack: new Sound('./audio/pig/attack.wav'),
            hit: new Sound('./audio/pig/hit.wav'),
            damaged: new Sound('./audio/pig/damaged.wav'),
            deadGround: new Sound('./audio/pig/deadGround.wav'),
            loser: new Sound('./audio/pig/loser.wav'),
            boom: new Sound('./audio/pig/boom.wav'),
            attention: new Sound('./audio/pig/attention.wav'),
            miss: new Sound('./audio/pig/miss.wav'),
        }

        this.visabilityRange = 64 * 3;

        this.isTimed = false;
        this.time;
    }

    update(index = 0) {
        this.previousPosition = +this.position.x;

        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalUnitsCollision();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalUnitsCollision(index);
        this.checkVerticalCollisions();

        this.updateDamagebox();

        // c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        // c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        // c.fillRect(this.damagebox.position.x, this.damagebox.position.y, this.damagebox.width, this.damagebox.height);
    }

    switchDialogue(dialogue) {
        if (this.isDying) return;
        let type = this.dialogues.left.animations[dialogue + 'In'].type;

        if (!this.preventDialogue[type]) {
            this.preventDialogue[type] = true;
            if (this.sounds[dialogue]) this.sounds[dialogue].play();
            this.dialogues[type].switchSprite(dialogue + 'In')
        }
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
                    x: this.hitbox.position.x - 30,
                    y: this.hitbox.position.y - 23
                },
                width: 30 + 15,
                height: 23 + this.hitbox.height
            }
        }
    }

    handleInput() {
        if (!this.isHit) this.velocity.x = 0;

        if (this.isDying && this.velocity.y == 0 && !this.isDyingGrounded) {
            this.isDyingGrounded = true;
            this.sounds.deadGround.play();
        }

        if (!this.preventInput) {
            if (this.currentAnimation) this.currentAnimation.isActive = false;

            // if (this.velocity.y == 0 && this.toJump) {
            //     if (Date.now() - this.pressJumpTime < 150) {
            //         this.velocity.y = -8;
            //     }
            //     this.toJump = false;
            // }

            if (this.keys.d.pressed) this.velocity.x = this.speed;
            else if (this.keys.a.pressed) this.velocity.x = -this.speed;
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

            if (this.keys.d.pressed && this.previousPosition != this.position.x) {
                this.sounds.run.playedKeyD = true;

                if (this.sounds.run.playedKeyA) {
                    this.sounds.run.playedKeyA = false;
                    this.sounds.run.currentTime = 0
                }

                this.sounds.run.play();

                this.switchSprite('runRight');
                this.lastDirection = 'right'
            } else if (this.keys.a.pressed && this.previousPosition != this.position.x) {
                this.sounds.run.playedKeyA = true;

                if (this.sounds.run.playedKeyD) {
                    this.sounds.run.playedKeyD = false;
                    this.sounds.run.currentTime = 0
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

    checkDamage() {
        if (this.hitbox.position.x <= player.damagebox.position.x + player.damagebox.width &&
            this.hitbox.position.x + this.hitbox.width >= player.damagebox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= player.damagebox.position.y &&
            this.hitbox.position.y <= player.damagebox.position.y + player.damagebox.height
        ) {
            if (this.isDying || this.isHit) return;
            this.isHit = true;
            this.isFalling = false;
            this.preventAnimation = true;
            this.preventInput = true;

            this.velocity.y = this.knockbackVelocity.y;
            if (player.lastDirection == 'left') {
                this.velocity.x =  -this.knockbackVelocity.x;
                this.lastDirection = 'right'
            } 
            else if (player.lastDirection == 'right') {
                this.velocity.x = this.knockbackVelocity.x;
                this.lastDirection = 'left'
            } 

            this.sounds.hit.play();
            if (this.lastDirection === 'left') this.switchSprite('hitLeft')
            else if (this.lastDirection === 'right') this.switchSprite('hitRight');
        }
    }

    checkAttackOpportunity() {
        if (!this.checkPlayerVisability()) return;

        if (player.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
            player.hitbox.position.x + player.hitbox.width >= this.damagebox.position.x &&
            player.hitbox.position.y + player.hitbox.height >= this.damagebox.position.y &&
            player.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
        ) {
            if (this.isHit || this.isDying) return;
            if (player.isHit || player.isDying) return;

            if (!this.isTimed) {
                this.isTimed = true;
                this.time = new Date();
            }

            const now = new Date();
            if (now - this.time > 250) {
                this.preventAnimation = true;

                this.sounds.attack.play();
                if (this.lastDirection === 'right') this.switchSprite('attackRight')
                else if (this.lastDirection === 'left') this.switchSprite('attackLeft')
                player.lastPigHit = this;

                player.checkDamage(this);
                this.time.setSeconds(this.time.getSeconds() + 1)
            }
            
        } else {
            const now = new Date();
            if (now - this.time > 300) this.isTimed = false;
        }
    }

    checkPlayerVisability() {
        this.keys.a.pressed = false;
        this.keys.d.pressed = false;
        this.isPlayerVisible = true;

        if (player.isDying) {
            this.isAttention = false;
            return false;
        }

        if (Math.abs(player.hitbox.position.y + player.hitbox.height - this.hitbox.position.y - this.hitbox.height) > 65) this.isPlayerVisible = false;
        if (Math.abs(player.hitbox.position.x - this.hitbox.position.x) > this.visabilityRange) this.isPlayerVisible = false;

        if (!this.isPlayerVisible) {
            if (this.isAttention && !(this instanceof CannonPig)) {
                this.isAttention = false;
                this.switchDialogue('miss');
            }

            return this.isPlayerVisible;
        }

        if (!this.isAttention && !(this instanceof CannonPig)) {
            this.isAttention = true;
            this.switchDialogue('attention')
        }

        if (player.hitbox.position.x + player.hitbox.width + 15 < this.hitbox.position.x) {
            this.keys.a.pressed = true;
        } else if (player.hitbox.position.x > this.hitbox.position.x + this.hitbox.width + 15) {
            this.keys.d.pressed = true;
        }

        if (player.hitbox.position.x + player.hitbox.width / 2 < this.hitbox.position.x + this.hitbox.width / 2) {
            this.lastDirection = 'left';
        } else  this.lastDirection = 'right'

        return this.isPlayerVisible;
    }

    checkOpportunities() {
        if (this.isDead) return;

        this.checkAttackOpportunity();
    }

    checkHorizontalUnitsCollision() {
        for(let i = 0; i < pigs.length; i++) {
            const pig = pigs[i];
            if (pig.isDying) continue;
            if (this == pig) continue;

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

    checkVerticalUnitsCollision(index) {
        for(let i = index; i < pigs.length; i++) {
            const pig = pigs[i];
            if (pig.isDying) continue;
            if (this == pig) continue;

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
        this.dialogues.left.draw();
        this.dialogues.right.draw();
    }
}