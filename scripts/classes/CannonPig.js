class CannonPig extends Pig {
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
                    this.haveMatch = false;
                    this.isLighting = false;
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
                    this.haveMatch = false;
                    this.isLighting = false;
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
            lightingMatchLeft: {
                frameRate: 3,
                frameBuffer: 10,
                loop: false,
                imageSrc: './img/pigs/cannonPig/lightingMatchLeft.png',
                onComplete: () => {
                    this.isLighting = false;
                    this.haveMatch = true;
                    this.switchSprite("matchOnLeft");
                }
            },
            lightingMatchRight: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/pigs/cannonPig/lightingMatchRight.png',
                onComplete: () => {
                    this.isLighting = false;
                    this.haveMatch = true;
                    this.switchSprite("matchOnRight");
                }
            },
            matchOnLeft: {
                frameRate: 3,
                loop: true,
                imageSrc: './img/pigs/cannonPig/matchOnLeft.png',
                onComplete: () => {
                    
                }
            },
            matchOnRight: {
                frameRate: 3,
                loop: true,
                imageSrc: './img/pigs/cannonPig/matchOnRight.png',
                onComplete: () => {
                    
                }
            },
            lightingCannonLeft: {
                frameRate: 3,
                frameBuffer: 10,
                loop: false,
                imageSrc: './img/pigs/cannonPig/lightingCannonLeft.png',
                onComplete: () => {
                    this.isLighting = false;
                    this.haveMatch = false;
                    this.preventInput = false;
                    this.preventAnimation = false;
                    this.switchSprite("idleLeft");
                }
            },
            lightingCannonRight: {
                frameRate: 3,
                frameBuffer: 10,
                loop: false,
                imageSrc: './img/pigs/cannonPig/lightingCannonRight.png',
                onComplete: () => {
                    this.isLighting = false;
                    this.haveMatch = false;
                    this.preventInput = false;
                    this.preventAnimation = false;
                    this.switchSprite("idleRight");
                }
            },
        },
        loop, 
        autoplay
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay, lastDirection})
        this.animationDelay = 1000;

        this.sounds.lightingMatch = new Sound('./audio/pig/lightingMatch.wav');
        this.sounds.lightingCannon = new Sound('./audio/pig/lightingCannon.wav');

        this.visabilityRange = 64 * 2 - 6;

        this.isLighting = false;
        this.haveMatch = false;
        this.lightingTime = Date.now();
        this.crossingTime = Date.now();
    }

    checkLightMatchOpportunity() {
        for (let i = 0; i < cannons.length; i++) {
            const cannon = cannons[i];

            if (cannon.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
                cannon.hitbox.position.x + cannon.hitbox.width >= this.damagebox.position.x &&
                cannon.hitbox.position.y + cannon.hitbox.height >= this.damagebox.position.y &&
                cannon.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
            ) {
                if (this.isHit || this.isDying || this.isLighting || this.haveMatch) return;

                if (player.isDying || (cannon.direction === 'left' && (
                    player.hitbox.position.x + player.hitbox.width + cannon.affectedArea.width < cannon.hitbox.position.x ||
                    player.hitbox.position.x > cannon.hitbox.position.x + cannon.hitbox.width ||
                    player.hitbox.position.y + player.hitbox.height - 1 <= cannon.hitbox.position.y ||
                    player.hitbox.position.y > cannon.hitbox.position.y + cannon.hitbox.height + cannon.affectedArea.height
                ))) return;
                if (player.isDying || (cannon.direction === 'right' && (
                    player.hitbox.position.x - cannon.affectedArea.width > cannon.hitbox.position.x + cannon.hitbox.width ||
                    player.hitbox.position.x + player.hitbox.width < cannon.hitbox.position.x ||
                    player.hitbox.position.y + player.hitbox.height - 1 <= cannon.hitbox.position.y ||
                    player.hitbox.position.y > cannon.hitbox.position.y + cannon.hitbox.height + cannon.affectedArea.height
                ))) return;

                const now = Date.now();
                if (now - this.lightingTime < this.animationDelay) return;

                this.isLighting = true;
                this.lightingTime = now;
                this.preventInput = true;
                this.preventAnimation = true;
                
                this.sounds.lightingMatch.play();
                if (this.lastDirection == 'right') this.switchSprite('lightingMatchRight')
                else if (this.lastDirection == 'left') this.switchSprite('lightingMatchLeft')
            }
        }
    }

    checkLightCannonOpportunity() {
        for (let i = 0; i < cannons.length; i++) {
            const cannon = cannons[i];

            if (cannon.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
                cannon.hitbox.position.x + cannon.hitbox.width >= this.damagebox.position.x &&
                cannon.hitbox.position.y + cannon.hitbox.height >= this.damagebox.position.y &&
                cannon.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
            ) {
                if(this.isHit || this.isDying || this.isLighting || !this.haveMatch) return;

                this.sounds.lightingCannon.play();
                const now = Date.now();
                if (now - this.lightingTime < this.animationDelay) return;

                this.isLighting = true;
                this.lightingTime = now;
                
                cannon.sounds.shot.play();
                if (this.lastDirection == 'right') {
                    this.switchSprite('lightingCannonRight');
                    cannon.switchSprite('shootRight');
                } 
                else if (this.lastDirection == 'left') {
                    this.switchSprite('lightingCannonLeft');
                    cannon.switchSprite('shootLeft');
                }

                cannon.lastPigShot = this;
            }
        }
    }

    checkAttackOpportunity() {
        if (this.isLighting || this.haveMatch) return;

        super.checkAttackOpportunity();
    }

    checkOpportunities() {
        super.checkOpportunities();
        this.checkLightMatchOpportunity();
        this.checkLightCannonOpportunity();
    }
}