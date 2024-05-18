class Diamond extends Unit {
    constructor({ 
        collisionObjects = [],
        position,
        imageSrc = './img/diamond/idle.png', 
        frameRate = 14, 
        frameBuffer = 12, 
        animations = {
            idle: {
                frameRate: 14,
                loop: true,
                imageSrc: './img/diamond/idle.png'
            },
            collected: {
                frameRate: 2,
                loop: false,
                imageSrc: './img/diamond/collected.png',
                onComplete: () => {
                    this.isCollected = true;

                    diamondbar.count++
                    diamondbar.initNumbers();
                }
            },
        },
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations });

        this.sounds = {
            collected: new Sound('./audio/diamond/collected.wav')
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

            this.isInteracted = true;
            player.sounds.pickUp.play();
            this.sounds.collected.play();
            this.switchSprite('collected')
        }
    }

    draw() {
        if(this.isCollected) return;
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
        this.update();
        this.beCollected();
    }
}