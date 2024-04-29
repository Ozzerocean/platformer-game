class Unit extends Sprite {
    constructor({ collisionBlocks = [], position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay}) {
        super({ position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.velocity = {
            x: 0,
            y: 0
        }
        
        this.currentFrame = Math.floor(Math.random() * this.frameRate)
        this.elapsedFrame = Math.floor(Math.random() * this.frameBuffer);
        this.isFalling = false;
        this.gravity = 0.4;
        this.collisionBlocks = collisionBlocks;
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();

        c.fillStyle = 'rgba(255, 0, 0, 0.3)' 
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.elapsedFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;

        if (this.animations[name].frameBuffer) this.frameBuffer = this.animations[name].frameBuffer
        else this.frameBuffer = this.defaultFrameBuffer;
        
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
        this.currentAnimation.isActive = false;
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.width,
            height: this.height
        }
    }

    checkHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }

                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }

    checkVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        if (this.velocity.y < 8) {
            this.velocity.y += this.gravity;
        }
        this.position.y += this.velocity.y;
    }
}