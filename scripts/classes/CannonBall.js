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
        }
    }) {
        super({ collisionObjects, position, imageSrc, animations })

        this.cannon = cannon;
        this.direction = direction;
        this.speed = cannon.power;

        if (direction == "left") this.velocity.x = -this.speed;
        else if (direction == "right") this.velocity.x = this.speed
        this.velocity.y = 0.001;

        this.isCollision = false;
        this.isDamaged = false;

        this.updateHitbox();
        this.updateDamegebox();
    }

    checkCollisions() {
        if (!player.isDying && !player.isHit && !this.isDamaged &&
            player.hitbox.position.x <= this.damagebox.position.x + this.damagebox.width &&
            player.hitbox.position.x + player.hitbox.width >= this.damagebox.position.x &&
            player.hitbox.position.y + player.hitbox.height >= this.damagebox.position.y &&
            player.hitbox.position.y <= this.damagebox.position.y + this.damagebox.height
        ) {
            player.isFalling = false;
            player.isHit = true;
            player.preventAnimation = true;
            player.preventInput = true;

            if (!this.isCollision) {
                player.velocity.y = player.knockbackVelocity.y;
                if (this.direction == "left") player.velocity.x = -player.knockbackVelocity.x;
                else if (this.direction = "right") player.velocity.x = player.knockbackVelocity.x;
            } else {
                if (player.hitbox.position.x + player.hitbox.width < this.damagebox.position.x + this.damagebox.width / 2) {
                    player.velocity.x = -player.knockbackVelocity.x;
                } else if (player.hitbox.position.x > this.damagebox.position.x + this.damagebox.width / 2) {
                    player.velocity.x = player.knockbackVelocity.x;
                }

                if (player.hitbox.position.y < this.damagebox.position.x + this.damagebox.width / 2) {
                    player.velocity.y = player.knockbackVelocity.y;
                } else {
                    player.velocity.y = -player.knockbackVelocity.y;
                }
            }
            
            
            if (player.lastDirection === 'left') player.switchSprite('hitLeft') 
            else if (player.lastDirection === 'right') player.switchSprite('hitRight');

            this.isDamaged = true;
        }

        if (this.isCollision) {
            this.isDamaged = true;

            return;
        }

        if (this.velocity.x == 0) {
            this.isCollision = true;
            this.velocity.y = 0;
            this.gravity = 0;

            if (this.direction === 'left') this.switchSprite('collisionLeft')
            else if (this.direction === 'right') this.switchSprite('collisionRight')

            return;
        }

        if (this.velocity.y == 0) {
            this.isCollision = true;
            this.velocity.x = 0;

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
        this.checkCollisions();
    }

    draw() {
        super.draw();
        this.update();
    }
}