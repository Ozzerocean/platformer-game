window.addEventListener("keydown", (event) => {
    if (player.preventInput) return;
    console.log(event.key)
    switch (event.key) {
        case "x":
        case "ч":
            if (player.isHit) return;

            player.toAttack = true;
            player.pressAttackTime = Date.now();

            // if (now - player.lastAttackTime < 300) return;
            
            // player.lastAttackTime = Date.now();
            // player.preventAnimation = true;
            // pigs.forEach((pig) => pig.checkDamage());
            // if (player.lastDirection === "right") player.switchSprite('attackRight')
            // else if (player.lastDirection === "left") player.switchSprite('attackLeft');
            
            break;
        case "ц":
        case "w":
        case " ":
        case "ArrowUp":
            player.toJump = true;
            player.pressJumpTime = Date.now();
            
            break;
        case "ф": 
        case "a":
        case "ArrowLeft":
            player.keys.a.pressed = true;
            break;
        case "в":
        case "d":
        case "ArrowRight":
            player.keys.d.pressed = true;
            break;
        case "e":
        case "у":
        case "z":
        case "я":
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    if (diamondbar.count >= door.diamondsToEnter && door.canBeOpened && !door.isOpen) {
                        diamondbar.count -= door.diamondsToEnter;
                        diamondbar.initNumbers();
                        door.isOpen = true;
                    }

                    if (!door.isOpen) return;

                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.preventAnimation = true;
                    player.enteringDoor = true;

                    doorIn = door;
                    doorOut = doorIn.toDoor;

                    player.sounds.doorIn.play();
                    if (player.lastDirection == "right") player.switchSprite('doorInRight')
                    else if (player.lastDirection == "left") player.switchSprite('doorInLeft');

                    door.sounds.opening.play();
                    door.switchSprite('opening')
                    return;
                }
            }

            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ц":
        case "w":
            player.keys.w.pressed = false;
            break;
        case "ф": 
        case "a":
        case "ArrowLeft":
            player.keys.a.pressed = false;
            break;
        case "в":
        case "d":
        case "ArrowRight":
            player.keys.d.pressed = false;
            break;
    }
});

window.addEventListener('resize', () => {
    shell.width = window.innerWidth;
    shell.height = window.innerHeight;

    background_canvas.width = window.innerWidth;
    background_canvas.height = window.innerHeight;
}, false);