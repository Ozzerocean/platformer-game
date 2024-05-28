class DiamondBar extends Sprite {
    constructor({ 
        position = {
            x: healthbar.position.x + 34,
            y: healthbar.position.y + 68
        },
        imageSrc = './img/diamondBar.png',
        frameRate = 13,
        frameBuffer = 20
    }) {
        super({ position, imageSrc, frameRate, frameBuffer });

        this.count = 0;
        this.numbers = [];
    }

    initNumbers() {
        this.numbers = [];

        for (let i = 0; i < this.count.toString().length; i++) {
            const number = new Sprite({
                position: {
                    x: this.position.x + 47 + 13 * i,
                    y: this.position.y + 3
                },
                imageSrc: './img/numbers.png',
                frameRate: 10,
                loop: false,
                autoplay: false
            });

            number.currentFrame = (parseInt(this.count.toString()[i]) + 9) % 10;

            this.numbers.push(number);
        }
    }

    draw() {
        super.draw(s)

        this.numbers.forEach((number) => {
            number.draw(s)
        });
    }
}

