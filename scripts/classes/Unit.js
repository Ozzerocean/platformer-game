class Unit extends Sprite {
    constructor({ collisionObjects = [], position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay}) {
        super({ position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.velocity = {
            x: 0,
            y: 0
        }

        this.knockbackVelocity = {
            x: 2,
            y: -3
        }
        
        this.currentFrame = Math.floor(Math.random() * this.frameRate)
        this.elapsedFrame = Math.floor(Math.random() * this.frameBuffer);
        this.isFalling = false;
        this.gravity = 0.4;
        this.collisionObjects = collisionObjects;
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkHorizontalCollisions();

        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();

        // c.fillStyle = 'rgba(255, 0, 0, 0.3)' 
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
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
        for(let i = 0; i < this.collisionObjects.length; i++) {
            const collisionObject = this.collisionObjects[i];

            if (collisionObject.checkHorizontalCollisions(this)) break;
        }
    }

    checkVerticalCollisions() {
        for(let i = 0; i < this.collisionObjects.length; i++) {
            const collisionObject = this.collisionObjects[i];

            if (collisionObject.checkVerticalCollisions(this)) break;
        }
    }

    applyGravity() {
        if (this.velocity.y < 8.3) {
            this.velocity.y += this.gravity;
        }
        this.position.y += this.velocity.y;
    }
}