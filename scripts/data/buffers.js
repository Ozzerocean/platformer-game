const buffers = {
    pig: {
        run: new Tone.Buffer('./audio/pig/run.wav'),
        ground: new Tone.Buffer('./audio/pig/ground.wav'),
        attack: new Tone.Buffer('./audio/pig/attack.wav'),
        hit: new Tone.Buffer('./audio/pig/hit.wav'),
        damaged: new Tone.Buffer('./audio/pig/damaged.wav'),
    },
    cannon: {
        shot: new Tone.Buffer('./audio/cannon/shot.wav'),
    },
    cannonBall: {
        fly: new Tone.Buffer('./audio/cannonBall/fly.wav'),
        explosion: new Tone.Buffer('./audio/cannonBall/explosion.wav'),
    }
}