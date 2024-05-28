class Level {
    constructor({
        collisions = [],
        background,
        doors = [],
        pigs = [],
        cannons = [],
        items = []
    }) {
        this.parsedCollisions = collisions.parse2D();
        this.collisionObjects = this.parsedCollisions.createObjectsFrom2D();

        this.background = background;
        this.doors = doors;
        this.pigs = pigs;
        this.cannons = cannons;
        this.items = items;
    }

    update() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        if (player.currentAnimation) player.currentAnimation.isActive = false;
        player.collisionObjects = this.collisionObjects;

        if (doorOut) {
            player.position.x = doorOut.position.x - player.width / 2 + doorOut.width / 2;
            player.position.y = doorOut.position.y - 15.01;
        } else {
            // doorOut = levels[level].doors[0];
            // player.position.x = doorOut.position.x - player.hitbox.width;
            // player.position.y = doorOut.position.y - 15.01;

            player.position.x = 64 * 9;
            player.position.y = 64 * 8;
        }

        this.pigs.forEach((pig) => {
            pig.collisionObjects = this.collisionObjects;
        })
        this.cannons.forEach((cannon) => {
            cannon.collisionObjects = this.collisionObjects;
        })
        this.items.forEach((item) => {
            item.collisionObjects = this.collisionObjects;
        })

        collisionObjects = this.collisionObjects;
        background = this.background;
        doors = this.doors;
        pigs = this.pigs;
        cannons = this.cannons;
        items = this.items;
    }
}