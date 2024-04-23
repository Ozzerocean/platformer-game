class Player extends Unit {
    constructor({ collisionBlocks = [], imageSrc, frameRate, frameBuffer, animations, loop, autoplay}) {
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
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();

        this.updateDamagebox();

        c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        c.fillStyle = 'rgba(0, 0, 255, 0.3)';
        c.fillRect(player.damagebox.position.x, player.damagebox.position.y, player.damagebox.width, player.damagebox.height);
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
                    x: this.hitbox.position.x + this.hitbox.width,
                    y: this.hitbox.position.y - 28
                },
                width: 64,
                height: 28 + this.hitbox.height
            }
        } else if (this.lastDirection === "left") {
            this.damagebox = {
                position: {
                    x: this.hitbox.position.x - 64,
                    y: this.hitbox.position.y - 28
                },
                width: 64,
                height: 28 + this.hitbox.height
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
}

