class Door extends Sprite {
    constructor({
        position,
        level,
        imageSrc = './img/door/idle.png',
        animations = {
            idle: {
                frameRate: 1,
                loop: false,
                imageSrc: './img/door/idle.png'
            },
            opening: {
                frameRate: 5,
                loop: false,
                imageSrc: './img/door/opening.png'
            },
            closing: {
                frameRate: 3,
                loop: false,
                autoplay: false,
                imageSrc: './img/door/closing.png'
            }
        },
        loop = false,
        toDoor,
        diamondsToEnter = 0,
        canBeOpened = true,
    }) {
        super({ position, imageSrc, animations, loop})  

        this.sounds = {
            opening: new Sound('./audio/door/opening.wav'),
            closing: new Sound('./audio/door/closing.wav'),
        }

        this.diamondsToEnter = diamondsToEnter;
        this.canBeOpened = canBeOpened;

        this.level = level;
        if (toDoor) {
            this.toDoor = toDoor;
            toDoor.toDoor = this;
        }
    }
}