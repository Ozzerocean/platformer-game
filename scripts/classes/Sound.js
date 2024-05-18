class Sound {
    constructor(buffer) {
        this.sound = new Tone.Player(buffer)

        this.sound.connect(reverb);
        this.switched = false;
    }

    play() {
        if (Tone.context.state !== "running") Tone.start();
        if (this.sound.state == "started" && !this.switched) return;
        this.switched = false;

        this.sound.start();
    }
}