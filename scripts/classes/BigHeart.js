class BigHeart extends Unit {
    constructor({ 
        collisionObjects = [],
        position,
        imageSrc = './img/bigHeart/idle.png', 
        frameRate = 12, 
        frameBuffer = 12, 
        animations = {
            idle: {
                frameRate: 12,
                loop: true,
                imageSrc: './img/bigHeart/idle.png'
            },
            collected: {
                frameRate: 2,
                loop: false,
                imageSrc: './img/bigHeart/collected.png',
                onComplete: () => {
                    player.health++;
                    this.isCollected = true;
                }
            },
        },
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations });

        this.sounds = {
            collected: new Sound('./audio/heart/collected.wav')
        }

        this.isInteracted = false;
        this.isCollected = false;
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 85,
                y: this.position.y + 86
            },
            width: 22,
            height: 20
        }
    }

    beCollected() {
        if (player.hitbox.position.x <= this.hitbox.position.x + this.hitbox.width &&
            player.hitbox.position.x + player.hitbox.width >= this.hitbox.position.x &&
            player.hitbox.position.y + player.hitbox.height >= this.hitbox.position.y &&
            player.hitbox.position.y <= this.hitbox.position.y + this.hitbox.height
        ) {
            if (this.isInteracted) return;

            if (player.health < 3) {
                this.isInteracted = true;
                player.sounds.pickUp.play();
                this.sounds.collected.play();
                this.switchSprite('collected')
            }
        }
    }

    draw() {
        if(this.isCollected) return;
        
        super.draw();

        this.update();
        this.beCollected();
    }
}