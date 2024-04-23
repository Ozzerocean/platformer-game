window.addEventListener("keydown", (event) => {
    if (player.preventInput) return;
    switch (event.key) {
        case " ":
            player.preventInput = true;

            if (player.lastDirection === "right") player.switchSprite('attackRight')
            else if (player.lastDirection === "left") player.switchSprite('attackLeft');
            
            break;
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
                    player.switchSprite('doorIn');
                    door.play()
                    return;
                }
            }

            if (player.velocity.y == 0) player.velocity.y = -13;
            break; 
        case "a":
            keys.a.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});