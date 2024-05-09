window.addEventListener("keydown", (event) => {
    if (player.preventInput) return;
    switch (event.key) {
        case " ": 
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
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.preventAnimation = true;

                    doorIn = door;
                    doorOut = doorIn.toDoor;

                    if (player.lastDirection == "right") player.switchSprite('doorInRight')
                    else if (player.lastDirection == "left") player.switchSprite('doorInLeft');

                    door.switchSprite('opening')
                    return;
                }
            }

            player.toJump = true;
            player.pressJumpTime = Date.now();
            
            break;
        case "ф": 
        case "a":
            player.keys.a.pressed = true;
            break;
        case "в":
        case "d":
            player.keys.d.pressed = true;
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
            player.keys.a.pressed = false;
            break;
        case "в":
        case "d":
            player.keys.d.pressed = false;
            break;
    }
});

window.addEventListener('resize', () => {
    shell.width = window.innerWidth;
    shell.height = window.innerHeight
}, false);