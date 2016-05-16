let audCtx = new AudioContext()
let cMajor = [261.626, 277.183, 329.628, 349.228, 391.995, 440, 493.883, 523.251]
let cMajorHarmony = [261.626, 329.628, 391.995, 523.251]

let playNote = function (frequency, duration, amp, attack, decay) {
    var osc = audCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = frequency

    // create gain node to control amplitude
    var gainNode = audCtx.createGain()
    gainNode.gain.setValueAtTime(0, audCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(amp, audCtx.currentTime + attack)
    gainNode.gain.linearRampToValueAtTime(0, audCtx.currentTime + attack + decay)

    osc.connect(gainNode)
    gainNode.connect(audCtx.destination)

    osc.start()
    osc.stop(audCtx.currentTime + attack + decay)
}
let oscNote = function (frequency, duration) {
    var osc = audCtx.createOscillator()

    // square, sine, triangle, sawtooth...
    osc.type = 'sine'

    osc.frequency.value = frequency

    osc.connect(audCtx.destination)

    osc.start()

    // remove the node two seconds from
    // the current audio time
    osc.stop(audCtx.currentTime + duration)
}