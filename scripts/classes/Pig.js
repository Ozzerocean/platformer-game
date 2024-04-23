class Pig extends Unit {
    constructor({ collisionBlocks = [], position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay}) {
        super({ collisionBlocks, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay})
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 21,
                y: this.position.y + 20
            },
            width: 38,
            height: 35
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