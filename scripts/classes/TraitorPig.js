class TraitorPig extends Pig {
    constructor({ 
        collisionObjects = [], 
        position,
        lastDirection, 
        imageSrc, 
        frameRate, 
        frameBuffer, 
        animations = {
            lookingOut: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/pigs/traitorPig/lookingOut.png'
            },
            hide: {
                frameRate: 4,
                loop: false,
                imageSrc: './img/pigs/traitorPig/hide.png'
            },
        },
        loop, 
        autoplay
    }) {
        super({ collisionObjects, position, imageSrc, frameRate, frameBuffer, animations, loop, autoplay, lastDirection})

        this.sounds.hi = new Sound('./audio/pig/hi.wav');
        this.sounds.diamonds = new Sound('./audio/pig/diamonds.wav');
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 61,
                y: this.position.y + 64
            },
            width: 38,
            height: 32
        }
    }

    handleInput() {
        if (levels[15].doors[1].isOpen) {
            if (this.currentAnimation != this.animations['hide']) this.switchSprite('hide');
            
            if (this.dialogues['right'].currentAnimation == this.dialogues['right'].animations['diamondsIn'])
            this.dialogues['right'].switchSprite('diamondsOut');

            return;
        }

        const isPlayerVisible = this.checkPlayerVisability();

        if (isPlayerVisible) this.switchSprite('lookingOut');
        else this.switchSprite('hide');
    }


    checkOpportunities() {
        return;
    }

    checkDamage() {
        return;
    }

    checkPlayerVisability() {
        let isPlayerVisible = true;

        if (Math.abs(player.hitbox.position.y + player.hitbox.height - this.hitbox.position.y - this.hitbox.height) > 193) isPlayerVisible = false;
        if (Math.abs(player.hitbox.position.x - this.hitbox.position.x) > this.visabilityRange) isPlayerVisible = false;

        if (!isPlayerVisible) {
            if (this.dialogues['right'].currentAnimation == this.dialogues['right'].animations['diamondsIn'])
            this.dialogues['right'].switchSprite('diamondsOut');

            return isPlayerVisible;
        }

        if (!this.isAttention) {
            this.isAttention = true;
            this.switchDialogue('hi')

            return isPlayerVisible;
        }

        this.switchDialogue('diamonds');

        return isPlayerVisible;
    }
}