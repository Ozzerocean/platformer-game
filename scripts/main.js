const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

const shell = document.querySelector('.shell');
const s = shell.getContext('2d');

canvas.width = 64 * 19;
canvas.height = 64 * 12;

shell.width = window.innerWidth;
shell.height = window.innerHeight

let parsedCollisions;
let collisionObjects;
let background;

let doors = [];
let doorIn;
let doorOut;

let pigs = [];
let cannons = [];
let items = [];

let level = 1;
const levels = [];

levels.push(
    new Level({
        collisions: collisionsLevel0,
        background: new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/backgroundLevel0.png'
        }),
        doors: [
            new Door({
                position: {
                    x: 64 * 3,
                    y: 64 * 11 - 112
                },
                level: 0,
            }),
            new Door({
                position: {
                    x: 64 * 13,
                    y: 64 * 11 - 112
                },
                level: 0,
            }),
        ],
        pigs: [
            new Pig({
                collisionObjects,
                position: {
                    x: 64 * 8,
                    y: 64 * 2
                },
                lastDirection: 'left',
                frameRate: 11,
            }),
            new Pig({
                collisionObjects,
                position: {
                    x: 80,
                    y: 64 * 3
                },
                lastDirection: 'right',
                frameRate: 11,
            }),
            new CannonPig({
                collisionObjects,
                position: {
                    x: 64 * 14 + 2,
                    y: 64 * 2
                },
                lastDirection: 'left',
                frameRate: 11,
            }),
        ],
        cannons: [
            new Cannon({
                collisionObjects,
                position: {
                    x: 64 * 13,
                    y: 64 * 2
                },
                affectedArea: {
                    width: 64 * 4,
                    height: 0,
                },
                direction: 'left'
            })
        ],
        items: [
            new BigHeart({
                collisionObjects,
                position: {
                    x: 64 * 15.3,
                    y: 64 * 10
                },
            }),
            new Diamond({
                collisionObjects,
                position: {
                    x: 64 * 7,
                    y: 64 * 10
                },
            })
        ]
    })
);

levels.push(
    new Level({
        collisions: collisionsLevel0,
        background: new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/backgroundLevel0.png'
        }),
        doors: [
            new Door({
                position: {
                    x: 64 * 3,
                    y: 64 * 11 - 112
                },
                level: 1,
                toDoor: levels[0].doors[1]
            }),
            new Door({
                position: {
                    x: 64 * 13,
                    y: 64 * 11 - 112
                },
                level: 1,
                toDoor: levels[0].doors[0]
            }),
        ],
        pigs: [
            new Pig({
                collisionObjects,
                position: {
                    x: 64 * 8,
                    y: 64 * 2
                },
                lastDirection: 'left',
                frameRate: 11,
            }),
            new Pig({
                collisionObjects,
                position: {
                    x: 80,
                    y: 64 * 3
                },
                lastDirection: 'right',
                frameRate: 11,
            }),
            new CannonPig({
                collisionObjects,
                position: {
                    x: 64 * 2.5,
                    y: 64 * 1
                },
                lastDirection: 'right',
                frameRate: 11,
            }),
        ],
        cannons: [
            new Cannon({
                collisionObjects,
                position: {
                    x: 64 * 3,
                    y: 64 * 1
                },
                affectedArea: {
                    width: 64 * 3,
                    height: 64 * 3,
                },
                direction: 'right',
                power: 5
            })
        ],
        items: [
            new BigHeart({
                collisionObjects,
                position: {
                    x: 64 * 15.3,
                    y: 64 * 10
                },
            }),
            new Diamond({
                collisionObjects,
                position: {
                    x: 64 * 7,
                    y: 64 * 10
                },
            })
        ]
    })
);

const player = new Player({});

const healthbar = new HealthBar({});
healthbar.initHearts();

const diamondbar = new DiamondBar({});
diamondbar.initNumbers();

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
    // collisionObjects.forEach((collisionObject) => {
    //     collisionObject.draw();
    // })

    healthbar.draw();
    diamondbar.draw();

    doors.forEach((door) => {
        door.draw();
    });

    pigs.forEach((pig, index) => {
        pig.handleInput();
        pig.update(index);
        pig.draw();
    });
    
    player.handleInput();
    player.draw();
    player.update();

    cannons.forEach((cannon) => {
        cannon.draw()
    })

    items.forEach((item) => {
        item.draw();
    })

    pigs.forEach((pig) => {
        pig.checkOpportunities();
    })

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore();
}

levels[level].update();
animate();