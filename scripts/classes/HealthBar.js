class HealthBar extends Sprite {
    constructor({ 
        position = {
            x: 40,
            y: 30
        },
        imageSrc = './img/healthBar.png' 
    }) {
        super({ position, imageSrc });

        this.heartsPosition = [
            {
                x: this.position.x + 40 + 27 * 0,
                y: 58
            },
            {
                x: this.position.x + 40 + 27 * 1,
                y: 58
            },
            {
                x: this.position.x + 40 + 27 * 2,
                y: 58
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
        super.draw(s)
        this.updateHearts();
    }
}