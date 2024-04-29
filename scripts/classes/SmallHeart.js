class SmallHeart extends Sprite {
    constructor({ 
        position,
        frameRate = 8,
        frameBuffer = 20,
        loop = true,
        imageSrc = './img/smallHeart/idle.png',
        animations = {
            idle: {
                frameRate: 8,
                frameBuffer: 20,
                loop: true,
                imageSrc: './img/smallHeart/idle.png'
            },
            hit: {
                frameRate: 2,
                frameBuffer: 20,
                loop: false,
                imageSrc: './img/smallHeart/hit.png',
                onComplete: () => {
                    healthbar.hearts.splice(-1, 1);
                }
            },
        }
    }) {
        super({ position, frameRate, frameBuffer, loop, imageSrc, animations });

        this.isHit = false;
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

        s.drawImage(
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
}