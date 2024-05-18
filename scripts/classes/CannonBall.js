class CannonBall extends Unit {
    constructor({ collisionObjects = [],
        cannon,
        position,
        direction,  
        imageSrc = './img/cannonBall/idle.png', 
        animations = {
            idle: {
                frameRate: 1,
                loop: true,
                imageSrc: './img/cannonBall/idle.png'
            },
            collisionBottom: {
                frameRate: 6,
                frameBuffer: 14,
                loop: false,
                imageSrc: './img/cannonBall/collisionBottom.png',
                onComplete: () => {
                    cannon.cannonBalls = [];
                }
            },
            collisionLeft: {
                frameRate: 6,
                frameBuffer: 14,
                loop: false,
                imageSrc: './img/cannonBall/collisionLeft.png',
                onComplete: () => {
                    cannon.cannonBalls = [];
                }
            },
            collisionRight: {
                frameRate: 6,
                frameBuffer: 14,
                loop: false,
                imageSrc: './img/cannonBall/collisionRight.png',
                onComplete: () => {
                    cannon.cannonBalls = [];
                }
            },
        },
        pigShot,
        sounds
    }) {
        super({ collisionObjects, position, imageSrc, animations })

        this.cannon = cannon;
        this.direction = direction;
        this.speed = cannon.power;

        if (direction == "left") this.velocity.x = -this.speed;
        else if (direction == "right") this.velocity.x = this.speed
        this.velocity.y = 0.001;

        this.isCollision = false;
        this.units = {
            "-1": {
                isDamaged: false
            }
        }

        this.sounds = sounds
        this.sounds.fly.play();

        this.pigShot = pigShot;

        this.isDamaged = false;

        this.updateHitbox();
        this.updateDamegebox();
    }

    checkUnitCollisions(unit, index = -1) {
        if (!unit.isDying && !unit.isHit && !this.isDamaged && !this.units[index]?.isDamaged &&
            unit.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
            unit.hitbox.position.x + unit.hitbox.width >= this.damagebox.position.x &&
            unit.hitbox.position.y + unit.hitbox.height >= this.damagebox.position.y &&
            unit.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
        ) {
            unit.isFalling = false;
            unit.isHit = true;
            unit.preventAnimation = true;
            unit.preventInput = true;

            if (!this.isCollision) {
                unit.velocity.y = unit.knockbackVelocity.y;
                if (this.direction == "left") unit.velocity.x = -unit.knockbackVelocity.x;
                else if (this.direction = "right") unit.velocity.x = unit.knockbackVelocity.x;
            } else {
                if (unit.hitbox.position.x + unit.hitbox.width < this.damagebox.position.x + this.damagebox.width / 2) {
                    unit.velocity.x = -unit.knockbackVelocity.x;
                } else if (unit.hitbox.position.x > this.damagebox.position.x + this.damagebox.width / 2) {
                    unit.velocity.x = unit.knockbackVelocity.x;
                }

                if (unit.hitbox.position.y < this.damagebox.position.x + this.damagebox.width / 2) {
                    unit.velocity.y = unit.knockbackVelocity.y;
                } else {
                    unit.velocity.y = -unit.knockbackVelocity.y;
                }

                this.pigShot.switchDialogue('boom')
            }

            if (index == -1) unit.lastPigHit = this.pigShot;
            
            unit.sounds.hit.play();
            if (unit.lastDirection === 'left') unit.switchSprite('hitLeft') 
            else if (unit.lastDirection === 'right') unit.switchSprite('hitRight');
        }
    }

    checkCollisions() {
        if (this.isCollision) {
            this.isDamaged = true;

            return;
        }

        if (this.velocity.x == 0) {
            this.isCollision = true;
            this.velocity.y = 0;
            this.gravity = 0;

            this.sounds.explosion.play();
            if (this.direction === 'left') this.switchSprite('collisionLeft')
            else if (this.direction === 'right') this.switchSprite('collisionRight')

            return;
        }

        if (this.velocity.y == 0) {
            this.isCollision = true;
            this.velocity.x = 0;

            this.sounds.explosion.play();
            this.switchSprite('collisionBottom');

            return;
        }
    }

    checkHorizontalCollisions() {
        for(let i = 0; i < this.collisionObjects.length; i++) {
            const collisionObject = this.collisionObjects[i];

            if (collisionObject.checkHorizontalCollisions(this)) {
                this.velocity.x = 0;
                break;
            }
        }
    }

    checkVerticalCollisions() {
        for(let i = 0; i < this.collisionObjects.length; i++) {
            const collisionObject = this.collisionObjects[i];

            if (collisionObject.checkVerticalCollisions(this)) {
                this.velocity.y = 0;
                break;
            }
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 70,
                y: this.position.y + 70
            },
            width: 20,
            height: 20
        }
    }

    updateDamegebox() {
        this.damagebox = this.hitbox;

        if (!this.isCollision) return;

        this.damagebox = {
            position: {
                x: this.position.x + 28,
                y: this.position.y + 26
            },
            width: this.width - 56,
            height: this.height - 56
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();

        this.updateDamegebox();
        this.checkUnitCollisions(player);
        pigs.forEach((pig, index) => this.checkUnitCollisions(pig, index))
        this.checkCollisions();
    }

    draw() {
        super.draw();
        this.update();
    }
}