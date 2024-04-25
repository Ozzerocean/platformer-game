class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 7, animations = {}, loop = true, autoplay = true}) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.defaultFrameBuffer = 7;
        this.frameBuffer = frameBuffer;
        this.elapsedFrame = 0;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation;

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = animations[key].imageSrc;
                this.animations[key].image = image;
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
            this.width,
            this.height
        );
        

        this.updateFrames();
    }

    play() {
        this.autoplay = true;
    }

    updateFrames() {
        if (!this.autoplay) return;
        this.elapsedFrame++

        if (this.elapsedFrame % this.frameBuffer == 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else if (this.loop) this.currentFrame = 0;
            this.elapsedFrame = 0;
        }

        if (this.currentAnimation?.onComplete) {
            if (this.currentFrame === this.frameRate - 1 && this.elapsedFrame % this.frameBuffer == 0 && !this.currentAnimation.isActive) {
                this.currentAnimation.isActive = true;
                this.currentAnimation.onComplete();
            }
        }
     }
}