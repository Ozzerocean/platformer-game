class Cannon extends Unit {
    constructor({
        collisionObjects,
        position,
        affectedArea,
        direction,
        power = 6,
        imageSrc = './img/cannon/idleRight.png',
        frameRate = 1,
        animations = {
            idleRight: {
                frameRate: 1,
                loop: true,
                imageSrc: './img/cannon/idleRight.png'
            },
            idleLeft: {
                frameRate: 1,
                loop: true,
                imageSrc: './img/cannon/idleLeft.png'
            },
            shootRight: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/cannon/shootRight.png',
                onComplete: () => {
                    this.switchSprite('idleRight');
                    this.isShot = false;
                }
            },
            shootLeft: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/cannon/shootLeft.png',
                onComplete: () => {
                    this.switchSprite('idleLeft');
                    this.isShot = false;
                }
            },
        }
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, animations });

        this.direction = direction;
        if (this.direction === 'right') this.switchSprite('idleRight')
        else if (this.direction === 'left') this.switchSprite('idleLeft');

        this.isShot = false;
        this.cannonBalls = [];

        this.lastPigShot;

        this.affectedArea = affectedArea;
        this.power = power

        this.updateHitbox();
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 72,
                y: this.position.y + 92
            },
            width: 54,
            height: 35
        }
    }

    draw() {
        super.draw();

        if (this.currentFrame == 1 && !this.isShot) {
            if (this.direction === 'left') {
                this.cannonBalls.push(new CannonBall({
                    collisionObjects,
                    cannon: this,
                    position: {
                        x: this.hitbox.position.x - 100,
                        y: this.hitbox.position.y - 67
                    },
                    direction: this.direction,
                    pigShot: this.lastPigShot
                }))
            }

            if (this.direction === 'right') {
                this.cannonBalls.push(new CannonBall({
                    collisionObjects,
                    cannon: this,
                    position: {
                        x: this.hitbox.position.x + this.hitbox.width - 100,
                        y: this.hitbox.position.y - 67
                    },
                    direction: this.direction,
                    pigShot: this.lastPigShot
                }))
            }

            this.isShot = true;
        }

        this.cannonBalls.forEach((ball) => ball.draw())
        
        this.update();
    }
}