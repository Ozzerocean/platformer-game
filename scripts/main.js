const background_canvas = document.querySelector('.background');
const bg = background_canvas.getContext('2d');

const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

const shell = document.querySelector('.shell');
const s = shell.getContext('2d');

canvas.width = 64 * 20;
canvas.height = 64 * 16;

shell.width = window.innerWidth;
shell.height = window.innerHeight;

background_canvas.width = window.innerWidth;
background_canvas.height = window.innerHeight;

let parsedCollisions;
let collisionObjects;
let background;

let doors = [];
let doorIn;
let doorOut;

let pigs = [];
let cannons = [];
let items = [];

const reverb = new Tone.Reverb({
    decay: 1,
    wet: 0.5
});
reverb.toDestination();

const playlist = [];
let currentSoundtackIndex = 0;

let level = 0;
let levels = [];
initLevels();

const player = new Player({});

const healthbar = new HealthBar({});
healthbar.initHearts();

const diamondbar = new DiamondBar({});
diamondbar.initNumbers();

const overlay = {
    opacity: 0
}

function initPlaylist() {
    let indecies = [1, 2, 3, 4, 5, 6, 7];
    indecies.sort(() => Math.random() - 0.5);

    for (let i = 0; i < indecies.length; i++) {
        playlist.push(new Audio('./audio/soundtracks/track-' + indecies[i] + '.mp3'))
        playlist[i].volume = 0.03;

        playlist[i].addEventListener('ended', function() {
            currentSoundtackIndex++;
            if (currentSoundtackIndex == playlist.length) currentSoundtackIndex = 0;

            playlist[currentSoundtackIndex].play();
        }, false);
    }
}

function animate() {
    window.requestAnimationFrame(animate);

    if (playlist[currentSoundtackIndex].paused) {
        promise = playlist[currentSoundtackIndex].play();
        promise.catch(error => {})
    }

    bg.fillStyle = 'rgb(63, 56, 81)';
    bg.fillRect(0, 0, shell.width, shell.height)

    background.draw();

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

    s.save();
    s.clearRect(0, 0, shell.width, shell.height)
    s.globalAlpha = overlay.opacity;
    s.fillStyle = 'black';
    s.fillRect(0, 0, shell.width, shell.height)
    s.restore();

    healthbar.draw();
    diamondbar.draw();
}

levels[level].update();

initPlaylist();
animate();
