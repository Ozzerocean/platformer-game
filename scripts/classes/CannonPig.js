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
            attackLeft: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/attackLeft.png',
                onComplete: () => {
                    this.switchSprite("idleLeft");
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
                    this.switchSprite("idleRight");
                    this.time.setSeconds(this.time.getSeconds() + 1)
                    this.haveMatch = false;
                    this.isLighting = false;
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
                    this.switchSprite("idleRight");
                }
            },
        },
        loop, 
        autoplay
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay, lastDirection})
        this.animationDelay = 1000;

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

                if (cannon.direction === 'left' && (
                    player.hitbox.position.x + player.hitbox.width + cannon.affectedArea.width < cannon.hitbox.position.x ||
                    player.hitbox.position.x > cannon.hitbox.position.x + cannon.hitbox.width ||
                    player.hitbox.position.y + player.hitbox.height - 1 <= cannon.hitbox.position.y ||
                    player.hitbox.position.y > cannon.hitbox.position.y + cannon.hitbox.height + cannon.affectedArea.height
                )) return;
                if (cannon.direction === 'right' && (
                    player.hitbox.position.x - cannon.affectedArea.width > cannon.hitbox.position.x + cannon.hitbox.width ||
                    player.hitbox.position.x + player.hitbox.width < cannon.hitbox.position.x ||
                    player.hitbox.position.y + player.hitbox.height - 1 <= cannon.hitbox.position.y ||
                    player.hitbox.position.y > cannon.hitbox.position.y + cannon.hitbox.height + cannon.affectedArea.height
                )) return;

                const now = Date.now();
                if (now - this.lightingTime < this.animationDelay) return;

                this.isLighting = true;
                this.lightingTime = now;
    
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

                const now = Date.now();
                if (now - this.lightingTime < this.animationDelay) return;

                this.isLighting = true;
                this.lightingTime = now;
    
                if (this.lastDirection == 'right') {
                    this.switchSprite('lightingCannonRight');
                    cannon.switchSprite('shootRight');
                } 
                else if (this.lastDirection == 'left') {
                    this.switchSprite('lightingCannonLeft');
                    cannon.switchSprite('shootLeft');
                }
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