const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
let pigs;

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            if (player.currentAnimation) player.currentAnimation.isActive = false;
            player.collisionBlocks = collisionBlocks;
            player.position.x = 64 * 3;
            player.position.y = 64 * 4;
            player.lastDirection = "right"

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 764,
                        y: 272
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    loop: false,
                    autoplay: false,
                })
            ];
            pigs = [
                new Pig({
                    collisionBlocks,
                    position: {
                        x: 64 * 7,
                        y: 64 * 3
                    },
                    lastDirection: 'left',
                    imageSrc: './img/pigs/idleLeft.png',
                    frameRate: 11,
                }),
                new Pig({
                    collisionBlocks,
                    position: {
                        x: 80,
                        y: 64 * 3
                    },
                    lastDirection: 'right',
                    imageSrc: './img/pigs/idleRight.png',
                    frameRate: 11,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            if (player.currentAnimation) player.currentAnimation.isActive = false;
            player.collisionBlocks = collisionBlocks;
            player.position.x = 76;
            player.position.y = 140;
            player.lastDirection = "right"

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    loop: false,
                    autoplay: false,
                })
            ];

            pigs = [];
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            if (player.currentAnimation) player.currentAnimation.isActive = false;
            player.collisionBlocks = collisionBlocks;
            player.position.x = 750;
            player.position.y = 160;
            player.lastDirection = "left"

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    loop: false,
                    autoplay: false,
                })
            ];

            pigs = [];
        }
    }
}

const player = new Player({ 
    imageSrc: './img/king/idleRight.png',
    frameRate: 11,
});

const healthbar = new HealthBar({
    position: {
        x: 30,
        y: 20
    },
    imageSrc: './img/healthBar.png'
})
healthbar.initHearts();

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.draw();
    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.draw();
    // })

    healthbar.draw();
    healthbar.updateHearts();

    healthbar.hearts.forEach((heart) => {
        heart.draw()
    })

    doors.forEach((door) => {
        door.draw();
    });

    pigs.forEach((pig, index) => {
        if (pig.isDead) {
            pigs.splice(index, 1);
        }

        pig.update();
        pig.draw();
    });
    
    player.handleInput(keys);
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore();
}

levels[level].init();
animate();