const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

const shell = document.querySelector('.shell');
const s = shell.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

shell.width = window.innerWidth;
shell.height = window.innerHeight

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
let pigs;
let items;

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
            ];

            items = [
                new BigHeart({
                    collisionBlocks,
                    position: {
                        x: 64 * 9,
                        y: 64 * 3
                    },
                }),
                new Diamond({
                    collisionBlocks,
                    position: {
                        x: 64 * 11,
                        y: 64 * 3
                    },
                })
            ];
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
            items = [];
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
            items = [];
        }
    }
}

const player = new Player({});

const healthbar = new HealthBar({});
healthbar.initHearts();

const diamondbar = new DiamondBar({});
diamondbar.initNumbers();

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

    s.fillStyle = 'rgb(63, 56, 81)';
    s.fillRect(0, 0, shell.width, shell.height)

    s.save();
    s.globalAlpha = overlay.opacity;
    s.fillStyle = 'black';
    s.fillRect(0, 0, shell.width, shell.height)
    s.restore();

    background.draw();
    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.draw();
    // })

    healthbar.draw();
    diamondbar.draw();

    doors.forEach((door) => {
        door.draw();
    });

    items.forEach((item) => {
        item.draw();
    })

    pigs.forEach((pig, index) => {
        pig.update();
        pig.draw();
    });
    
    player.handleInput(keys);
    player.draw();
    player.update();

    pigs.forEach((pig) => {
        pig.checkAttackOpportunity();
    })

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore();
}

levels[level].init();
animate();