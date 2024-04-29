class HealthBar extends Sprite {
    constructor({ 
        position = {
            x: 30,
            y: 20
        },
        imageSrc = './img/healthBar.png' 
    }) {
        super({ position, imageSrc });

        this.heartsPosition = [
            {
                x: 66,
                y: 48
            },
            {
                x: 88,
                y: 48
            },
            {
                x: 110,
                y: 48
            },
        ]

        this.hearts = [];
    }

    initHearts() {
        for (let i = 0; i < player.health; i++) {
            this.hearts.push(new SmallHeart({
                position: this.heartsPosition[i]
            }))
        }
    }

    updateHearts() {
        if (player.health < this.hearts.length) {
            for (let i = player.health; i < this.hearts.length; i++) {
                if (!this.hearts[i].isHit) {
                    // this.hearts[i].isHit = true;
                    this.hearts[i].switchSprite('hit');
                } 
            }
        } else if (player.health > this.hearts.length) {
            for (let i = this.hearts.length; i < player.health; i++) {
                this.hearts.push(new SmallHeart({
                    position: this.heartsPosition[i]
                }))
            }
        }

        this.hearts.forEach((heart) => {
            heart.draw()
        })
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
        this.updateHearts();
    }
}