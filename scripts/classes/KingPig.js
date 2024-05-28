class KingPig extends Pig {
    constructor({ 
        collisionObjects = [], 
        position,
        lastDirection = 'left', 
        imageSrc = './img/pigs/kingPig/idleRight.png', 
        frameRate = 12, 
        frameBuffer, 
        animations = {
            idleRight: {
                frameRate: 12,
                loop: true,
                imageSrc: './img/pigs/kingPig/idleRight.png'
            },
            idleLeft: {
                frameRate: 12,
                loop: true,
                imageSrc: './img/pigs/kingPig/idleLeft.png'
            },
            runRight: {
                frameRate: 6,
                loop: true,
                imageSrc: './img/pigs/kingPig/runRight.png'
            },
            runLeft: {
                frameRate: 6,
                loop: true,
                imageSrc: './img/pigs/kingPig/runLeft.png'
            },
            attackLeft: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/kingPig/attackLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            },
            attackRight: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/pigs/kingPig/attackRight.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.handleInput();
                    this.time.setSeconds(this.time.getSeconds() + 1)
                }
            },
            jumpLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/jumpLeft.png'
            },
            jumpRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/jumpRight.png'
            },
            fallLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/fallLeft.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            fallRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/fallRight.png',
                onComplete: () => {
                    this.isFalling = true;
                }
            },
            groundLeft: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/groundLeft.png',
                onComplete: () => {
                    this.preventAnimation = false;
                    this.isFalling = false;
                    this.handleInput();
                }
            },
            groundRight: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/pigs/kingPig/groundRight.png',
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
                imageSrc: './img/pigs/kingPig/hitLeft.png',
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
                imageSrc: './img/pigs/kingPig/hitRight.png',
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
                imageSrc: './img/pigs/kingPig/deadLeft.png',
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
                imageSrc: './img/pigs/kingPig/deadRight.png',
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
        super({ collisionObjects, position, lastDirection, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.visabilityRange = 64 * 12;
    }

    checkPlayerVisability() {
        this.isPlayerVisible = true;

        if (player.isDying) {
            this.isAttention = false;
            return false;
        }

        if (Math.abs(player.hitbox.position.y + player.hitbox.height - this.hitbox.position.y - this.hitbox.height) > 65) this.isPlayerVisible = false;
        if (Math.abs(player.hitbox.position.x - this.hitbox.position.x) > this.visabilityRange) this.isPlayerVisible = false;

        if (!this.isAttention) {
            this.isAttention = true;
            this.switchDialogue('attention')
        }

        if (player.hitbox.position.x + player.hitbox.width / 2 < this.hitbox.position.x + this.hitbox.width / 2) {
            this.lastDirection = 'left';
        } else  this.lastDirection = 'right'

        return this.isPlayerVisible;
    }
}