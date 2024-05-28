class Dialogue extends Sprite {
    constructor({ 
        unit,
        imageSrc = './img/dialogue/empty.png',
        type,
        frameRate = 1,
        animations = {
            empty: {
                frameRate: 1,
                loop: true,
                imageSrc: './img/dialogue/empty.png',
                onComplete: () => {
                    unit.preventDialogue[this.type] = false;
                }
            },
            loserIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/loserIn.png',
                type: 'left',
                onComplete: () => {
                    this.switchSprite('loserOut');
                }
            },
            loserOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/loserOut.png',
                type: 'left',
                onComplete: () => {
                    this.switchSprite('empty');
                }
            },
            boomIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/boomIn.png',
                type: 'left',
                onComplete: () => {
                    this.switchSprite('boomOut');
                }
            },
            boomOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/boomOut.png',
                type: 'left',
                onComplete: () => {
                    this.switchSprite('empty');
                }
            },
            attentionIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/attentionIn.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('attentionOut');
                },
            },
            attentionOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/attentionOut.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('empty');
                }
            },
            missIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/missIn.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('missOut');
                },
            },
            missOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/missOut.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('empty');
                }
            },
            diamondsIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/diamondsIn.png',
                type: 'right',
            },
            diamondsOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/diamondsOut.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('empty');
                },
            },
            hiIn: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/hiIn.png',
                type: 'right',
                onComplete: () => {
                    this.switchSprite('hiOut')
                },
            },
            hiOut: {
                frameRate: 3,
                loop: false,
                imageSrc: './img/dialogue/hiOut.png',
                type: 'right',
                onComplete: () => {
                    unit.preventDialogue[this.type] = false;
                    levels[15].doors[1].canBeOpened = true;
                },
            },
        },
        loop = false
    }) {
        super({ imageSrc, frameRate, animations, loop })

        this.type = type,

        this.unit = unit;
        this.updatePosition();
    }

    updatePosition() {
        if (this.type == 'left') {
            this.position = {
                x: this.unit.hitbox.position.x - 115,
                y: this.unit.hitbox.position.y - 110
            }
        } else if (this.type == 'right') {
            this.position = {
                x: this.unit.hitbox.position.x + this.unit.hitbox.width - 88,
                y: this.unit.hitbox.position.y - 110
            }
        }      
    }

    updateFrames() {
        if (!this.autoplay) return;
        this.elapsedFrame++

        if (this.elapsedFrame % this.frameBuffer == 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else if (this.loop) this.currentFrame = 0;
            this.elapsedFrame = 0;
        }

        if (this.currentFrame == this.frameRate - 1 && this.frameRate != 1) this.frameBuffer = 100

        if (this.currentAnimation?.onComplete) {
            if (this.currentFrame === this.frameRate - 1 && this.elapsedFrame % this.frameBuffer == this.frameBuffer - 1) {
                this.currentAnimation.isActive = true;
                this.currentAnimation.onComplete();
            }
        }
    }
    
    draw() {
        super.draw();

        this.updatePosition();
    }
}