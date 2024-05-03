class Unit extends Sprite {
    constructor({ collisionObjects = [], position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay}) {
        super({ position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})

        this.velocity = {
            x: 0,
            y: 0
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

            // if (this.hitbox.position.x <= collisionObject.position.x + collisionObject.width &&
            //     this.hitbox.position.x + this.hitbox.width >= collisionObject.position.x &&
            //     this.hitbox.position.y + this.hitbox.height >= collisionObject.position.y &&
            //     this.hitbox.position.y <= collisionObject.position.y + collisionObject.height
            // ) {
            //     if (this.velocity.x < 0) {
            //         const offset = this.hitbox.position.x - this.position.x;
            //         this.position.x = collisionObject.position.x + collisionObject.width - offset + 0.01;
            //         break;
            //     }

            //     if (this.velocity.x > 0) {
            //         const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
            //         this.position.x = collisionObject.position.x - offset - 0.01;
            //         break;
            //     }
            // }

            if (collisionObject.checkHorizontalCollisions(this)) break;
        }
    }

    checkVerticalCollisions() {
        for(let i = 0; i < this.collisionObjects.length; i++) {
            const collisionObject = this.collisionObjects[i];

            // if (this.hitbox.position.x <= collisionObject.position.x + collisionObject.width &&
            //     this.hitbox.position.x + this.hitbox.width >= collisionObject.position.x &&
            //     this.hitbox.position.y + this.hitbox.height >= collisionObject.position.y &&
            //     this.hitbox.position.y <= collisionObject.position.y + collisionObject.height
            // ) {
            //     if (this.velocity.y < 0) {
            //         this.velocity.y = 0;

            //         const offset = this.hitbox.position.y - this.position.y;
            //         this.position.y = collisionObject.position.y + collisionObject.height - offset + 0.01;
            //         break;
            //     }

            //     if (this.velocity.y > 0) {
            //         this.velocity.y = 0;

            //         const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
            //         this.position.y = collisionObject.position.y - offset - 0.01;
            //         break;
            //     }
            // }

            if (collisionObject.checkVerticalCollisions(this)) break;
        }
    }

    applyGravity() {
        if (this.velocity.y < 8) {
            this.velocity.y += this.gravity;
        }
        this.position.y += this.velocity.y;
    }
}