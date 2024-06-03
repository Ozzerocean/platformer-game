class CollisionPlank {
    constructor({position}) {
        this.position = position;
        this.width = 64;
        this.height = 8;
    }

    checkHorizontalCollisions(unit) {
        return;
    }

    checkVerticalCollisions(unit) {
        if (unit.hitbox.position.x <= this.position.x + this.width &&
            unit.hitbox.position.x + unit.hitbox.width >= this.position.x &&
            unit.hitbox.position.y + unit.hitbox.height >= this.position.y &&
            unit.hitbox.position.y <= this.position.y + this.height
        ) {
            if (unit.velocity.y < 0) return true;

            if (unit.velocity.y > 0 && unit.hitbox.position.y + unit.hitbox.height < this.position.y + this.height) {
                unit.velocity.y = 0;

                const offset = unit.hitbox.position.y - unit.position.y + unit.hitbox.height;
                unit.position.y = this.position.y - offset - 0.01;
                return true;
            }
        }
    }

    draw() {
        c.fillStyle = "rgba(255, 0, 255, 0.25)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}