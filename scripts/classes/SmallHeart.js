class SmallHeart extends Sprite {
    constructor({ 
        position,
        frameRate = 13,
        frameBuffer = 20,
        loop = true,
        imageSrc = './img/smallHeart/idle.png',
        animations = {
            idle: {
                frameRate: 13,
                frameBuffer: 20,
                loop: true,
                imageSrc: './img/smallHeart/idle.png'
            },
            hit: {
                frameRate: 2,
                frameBuffer: 12,
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
        super.draw(s)
        this.updateFrames();
    }
}