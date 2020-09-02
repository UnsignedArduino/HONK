namespace SpriteKind {
    export const Info = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Splash)) {
        Car.vy = -32
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(randint(5, 20))
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
function summon_slow_car (speed: number, num: number, x: number, y: number) {
    RandomNumber = randint(0, 2)
    if (RandomNumber == 0) {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 4 2 2 2 2 2 2 c 2 . . . 
            . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
            . 2 c 2 e e e e e e e b c 4 2 2 
            . 2 2 e b b e b b b e e b 4 2 2 
            . 2 e b b b e b b b b e 2 2 2 2 
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
            . e e e e e e f e e e f e 2 d d 
            . e e e e e e f e e f e e e 2 d 
            . e e e e e e f f f e e e e e e 
            . e f f f f e e e e f f f e e e 
            . . f f f f f e e f f f f f e . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    } else if (RandomNumber == 1) {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . 6 9 6 6 6 6 6 6 c 6 . . . 
            . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
            . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
            . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
            . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
            . 6 8 b b b 8 b b b b 8 6 6 6 6 
            . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
            . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
            . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
            . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
            . 8 f f f f 8 8 8 8 f f f 8 8 8 
            . . f f f f f 8 8 f f f f f 8 . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    } else {
        SlowCars.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 3 3 3 3 3 3 3 3 . . . . 
            . . . 3 d 3 3 3 3 3 3 c 3 . . . 
            . . 3 c d 3 3 3 3 3 3 c c 3 . . 
            . 3 c c d d d d d d 3 c c d 3 d 
            . 3 c 3 a a a a a a a b c d 3 3 
            . 3 3 a b b a b b b a a b d 3 3 
            . 3 a b b b a b b b b a 3 3 3 3 
            . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 
            . a a a a a a f a a a f a 3 d d 
            . a a a a a a f a a f a a a 3 d 
            . a a a a a a f f f a a a a a a 
            . a f f f f a a a a f f f a a a 
            . . f f f f f a a f f f f f a . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy))
    }
    get_last_slowcar().vx = speed
    sprites.setDataNumber(get_last_slowcar(), "Num", num)
    sprites.setDataBoolean(get_last_slowcar(), "Destroy", true)
    tiles.placeOnTile(get_last_slowcar(), tiles.getTileLocation(x, y))
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Splash) {
        SelectedCarImage += 1
        if (SelectedCarImage == 3) {
            SelectedCarImage = 0
        }
        Car.startEffect(effects.halo, 2000)
        imagemorph.morph(Car, CarImages[SelectedCarImage][0])
        blockSettings.writeNumber("HONK!:SelectedCarImage", SelectedCarImage)
    }
    pause(1000)
})
function make_slow_cars_undestructible () {
    for (let SlowCar of SlowCars) {
        sprites.setDataBoolean(SlowCar, "Destroy", false)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Dead)) {
        if (Splash) {
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            pause(1000)
            init_car_location(8)
            Car.x = 23 * 16
            Splash = false
            info.setScore(0)
            info.setLife(3)
            SplashScreen.destroy()
            color.startFade(color.Black, color.originalPalette, 500)
        } else {
            if (SlowCars.length >= HonkPos && sprites.readDataBoolean(SlowCars[HonkPos], "Destroy")) {
                sprites.changeDataNumberBy(SlowCars[HonkPos], "Num", HonkPower * -1)
                info.changeScoreBy(HonkPower)
            }
            Car.setImage(CarImages[SelectedCarImage][1])
            timer.throttle("Honk", music.beat(BeatFraction.Half), function () {
                music.playTone(554, music.beat(BeatFraction.Half))
            })
        }
    }
})
function run_crash_noise () {
    timer.background(function () {
        for (let index = 0; index < 16; index++) {
            music.playTone(139, music.beat(BeatFraction.Sixteenth))
            music.rest(music.beat(BeatFraction.Sixteenth))
        }
    })
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    Car.vy = 0
    for (let index = 0; index < Car.bottom % 16; index++) {
        Car.y += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "Type") == "extra noise") {
        HonkPower += 1
        Car.say("Honk power: " + HonkPower, 2000)
    }
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprite.startEffect(effects.halo, 100)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerUp.play()
})
function play_music () {
    while (true) {
        music.rest(music.beat(BeatFraction.Double))
        for (let Index = 0; Index <= Song.length; Index++) {
            if (Song[Index] == 0) {
                music.rest(Durations[Index])
            } else {
                music.playTone(Song[Index], Durations[Index])
            }
        }
    }
}
function summon_heart (x: number, y: number) {
    Heart = sprites.create(img`
        . c 2 2 . . 2 2 . 
        c 2 2 2 2 2 2 2 2 
        c 2 2 2 2 2 2 2 2 
        c 2 2 2 2 2 2 2 2 
        . c 2 2 2 2 2 2 . 
        . . c 2 2 2 2 . . 
        . . . c 2 2 . . . 
        `, SpriteKind.Heart)
    Heart.lifespan = 5000
    tiles.placeOnTile(Heart, tiles.getTileLocation(x, y))
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    Car.setImage(CarImages[SelectedCarImage][0])
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    Car.vy = 0
    for (let index = 0; index < 16 - Car.top % 16; index++) {
        Car.y += -1
    }
})
function get_last_slowcar () {
    return SlowCars[SlowCars.length - 1]
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Splash)) {
        Car.vy = 32
    }
})
function summon_powerup_extra_noise (x: number, y: number) {
    PowerUp = sprites.create(img`
        . . . . . . . . . . c c c b b . . . . . . . . . 
        . . . . . . . . . c b 1 1 d b b . . . . . . . . 
        . . . . . . . . c d 1 1 c b d b . . . . 6 . . . 
        . . . . c c c c b 1 1 c c c b d b . . . . 6 . . 
        . c c c c b c c 1 1 c c c c c d b . . 6 . . 6 . 
        c b 1 c b 1 b b 1 1 c d b c c b c . . . 6 . . 6 
        c d b b 1 1 b b 1 d c d d c f b c . 6 . . 6 . 6 
        c d b b d 1 b b d d b d b f f b c . . 6 . 6 . 6 
        c d b b d d b b d d b b c f f b c . . 6 . 6 . 6 
        c d b b b d b b d d f f f f f b c . 6 . . 6 . 6 
        c b d b b b b b d d c f f f c b c . . . 6 . . 6 
        . c c c c b c c d d b f f f b d b . . 6 . . 6 . 
        . . . . c c c c b 1 1 d c b d b . . . . . 6 . . 
        . . . . . . . . c b 1 1 1 d b b . . . . 6 . . . 
        . . . . . . . . . c c c c c b . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        `, SpriteKind.PowerUp)
    PowerUp.lifespan = 5000
    sprites.setDataString(PowerUp, "Type", "extra noise")
    tiles.placeOnTile(PowerUp, tiles.getTileLocation(x, y))
}
info.onLifeZero(function () {
    Car.destroy(effects.fire, 100)
    make_slow_cars_undestructible()
    Dead = true
    run_crash_noise()
    timer.after(5000, function () {
        game.over(false)
    })
})
function add_measures_1_7 () {
    for (let Note2 of [
    784,
    494,
    659,
    740,
    784,
    659,
    740,
    784
    ]) {
        add_note(Note2, music.beat(BeatFraction.Half))
    }
    add_note(740, music.beat(BeatFraction.Double))
    add_note(988, music.beat(BeatFraction.Double))
    for (let Note2 of [
    659,
    392,
    523,
    587,
    659,
    523,
    587,
    659
    ]) {
        add_note(Note2, music.beat(BeatFraction.Half))
    }
    add_note(587, music.beat(BeatFraction.Double))
    add_note(784, music.beat(BeatFraction.Double))
    for (let Note2 of [523, 330, 440, 494]) {
        add_note(Note2, music.beat(BeatFraction.Half))
    }
    add_note(523, music.beat(BeatFraction.Double))
    for (let Note2 of [494, 294, 392, 440]) {
        add_note(Note2, music.beat(BeatFraction.Half))
    }
    add_note(494, music.beat(BeatFraction.Double))
    for (let index = 0; index < 5; index++) {
        add_note(659, music.beat(BeatFraction.Half))
    }
    for (let Note2 of [740, 659, 587]) {
        add_note(Note2, music.beat(BeatFraction.Half))
    }
}
function add_note (note: number, duration: number) {
    Song.push(note)
    Durations.push(duration)
}
function summon_coin (x: number, y: number) {
    Coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Coin)
    Coin.lifespan = 5000
    tiles.placeOnTile(Coin, tiles.getTileLocation(x, y))
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    for (let SlowCar of SlowCars) {
        SlowCar.ax = Math.abs(SlowCar.vx) * -2
        SlowCar.setFlag(SpriteFlag.AutoDestroy, true)
    }
    make_slow_cars_undestructible()
    SlowCars.removeAt(SlowCars.indexOf(sprite))
})
function init_car_location (speed: number) {
    tiles.placeOnTile(Car, tiles.getTileLocation(0, 4))
    Car.x = 16
    Car.vx = speed
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    run_crash_noise()
    make_slow_cars_undestructible()
})
let Coin: Sprite = null
let PowerUp: Sprite = null
let Heart: Sprite = null
let Durations: number[] = []
let Song: number[] = []
let RandomNumber = 0
let SelectedCarImage = 0
let CarImages: Image[][] = []
let SplashScreen: Sprite = null
let Dead = false
let HonkPower = 0
let HonkPos = 0
let SlowCars: Sprite[] = []
let Splash = false
let Car: Sprite = null
Car = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . . 
    . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . . . 
    . 2 2 e b b e b b b e e b 4 2 2 . . . . . . . . 
    . 2 e b b b e b b b b e 2 2 2 2 . . . . . . . . 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . . . . . . . 
    . e e e e e e f e e e f e 2 d d . . . . . . . . 
    . e e e e e e f e e f e e e 2 d . . . . . . . . 
    . e e e e e e f f f e e e e e e . . . . . . . . 
    . e f f f f e e e e f f f e e e . . . . . . . . 
    . . f f f f f e e f f f f f e . . . . . . . . . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Car.setFlag(SpriteFlag.StayInScreen, true)
Car.setFlag(SpriteFlag.ShowPhysics, false)
tiles.setTilemap(tiles.createTilemap(hex`1e000900040101050101040301010104010301010104010401010501010403010101010103010104010105010301010104010301010101030101040101050103020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202010104010101050101010103010101050101010101040101010501010101050101030104010301010401010401010301010501010301040103010104`, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile1,sprites.vehicle.roadHorizontal,sprites.castle.tileGrass2,sprites.castle.tileGrass1,sprites.castle.tileGrass3], TileScale.Sixteen))
init_car_location(64)
scene.cameraFollowSprite(Car)
Splash = true
SlowCars = []
HonkPos = 2
HonkPower = 1
let SlowCarHonks = 1
Dead = false
SplashScreen = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . 1 . . . . . 6 6 6 6 6 6 6 6 . . . . . . 
    . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . . f f . . f f . . f f f . . f . . . f . f f f . f . f . f f f . f f f . f f f . f f . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . . . . . . 1 1 1 . . . . 6 9 6 6 6 6 6 6 c 6 . . . . . 
    . . f f . . . . f f . . . . f f f f . . . . f f f . . . . f f . . f f . . . f f f . . f f . . f . f . . f f . f f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . f . . d d 1 1 . . . . 6 c 9 6 6 6 6 6 6 c c 6 . . . . 
    . . f f . . . . f f . . f f . . . . f f . . f f f f . . . f f . . f f . . f f f . . . f f . . f f f . . f . f . f . f f f . f f . . f f f . f . . . f . f . f . f . f f f . . . . . . . . . . . . . . . . . . . . . . . . . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . f . . . d . 1 . . . . 6 c c 9 9 9 9 9 9 6 c c 9 6 d . . 
    . . f f . . . . f f . . f f . . . . f f . . f f f f f . . f f . . f f . f f f . . . . f f . . f . f . . f . . . f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . f f f . . d d 1 1 . . . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 . . 
    . . f f . . . . f f . . f f . . . . f f . . f f . f f f . f f . . f f f f f . . . . . f f . . f . f . . f . . . f . f . f . f . f . f f f . f f f . f f f . f f . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . 2 2 e b b e b b b e e b 4 2 2 . . . . f f f . . . . 1 d d d 1 . . 6 6 8 b b 8 b b b 8 8 b 9 6 6 . . 
    . . f f f f f f f f . . f f . . . . f f . . f f . . f f f f f . . f f f f . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 e b b b e b b b b e 2 2 2 2 . . . f f f f f f . . 1 d d 1 d . . 6 8 b b b 8 b b b b 8 6 6 6 6 . . 
    . . f f f f f f f f . . f f . . . . f f . . f f . . . f f f f . . f f f f . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . f f f . . . . . . 1 1 d d 1 1 . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 . . 
    . . f f . . . . f f . . f f . . . . f f . . f f . . . . f f f . . f f f f f . . . . . f f . . f f f . f f f . f f f . f f f . f f . . f f f . . f f f f . f f f . f . . . f . . . f f f . f f f . f . . . f . f f f . . . . e e e e e e f e e e f e 2 d d . . . f f f f f f . . 1 1 d 1 1 1 . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d . . 
    . . f f . . . . f f . . f f . . . . f f . . f f . . . . . f f . . f f . f f f . . . . f f . . f . f . f . f . f . . . f . f . f . f . f . . . . . . f . . f . f . f f . f f . . f . . . . f . f . f f . f f . f . . . . . . e e e e e e f e e f e e e 2 d . . . . f f f . . . . . 1 d . . . . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d . . 
    . . f f . . . . f f . . f f . . . . f f . . f f . . . . . f f . . f f . . f f f . . . . . . . f f f . f f . . f . . . f f f . f . f . f f f . . . . f . . f f f . f . f . f . . f . f . . f f f . f . f . f . f f f . . . . e e e e e e f f f e e e e e e . . . . . . f f f . . . 1 . d . . . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 . . 
    . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . f f f . . f f . . f . f . f . f . f . . . f . f . f . f . f . . . . f . f . . f . f . f . . . f . . f . . f . f . f . f . . . f . f . . . . . . e f f f f e e e e f f f e e e . . . . . . . f . . . . 1 1 d d . . 8 f f f f 8 8 8 8 f f f 8 8 8 . . 
    . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . . f f . . f f . . f . f . f . f . f f f . f . f . f f . . f f f . . f f f . . f . f . f . . . f . . . f f f . f . f . f . . . f . f f f . . . . . f f f f f e e f f f f f e . . . . . . . . . f . . . . 1 1 d d . . f f f f f 8 8 f f f f f 8 . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f . . . . f f f f . . . . . . . . . . . . . . . . 1 1 1 1 . . f f f . . . . f f f f . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    `, SpriteKind.Info)
SplashScreen.setFlag(SpriteFlag.RelativeToCamera, true)
SplashScreen.top = 0
SplashScreen.left = 0
CarImages = [[img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . . 
    . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . . . 
    . 2 2 e b b e b b b e e b 4 2 2 . . . . . . . . 
    . 2 e b b b e b b b b e 2 2 2 2 . . . . . . . . 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . . . . . . . 
    . e e e e e e f e e e f e 2 d d . . . . . . . . 
    . e e e e e e f e e f e e e 2 d . . . . . . . . 
    . e e e e e e f f f e e e e e e . . . . . . . . 
    . e f f f f e e e e f f f e e e . . . . . . . . 
    . . f f f f f e e f f f f f e . . . . . . . . . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . f . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . f . . 
    . 2 c 2 e e e e e e e b c 4 2 2 . . . . f . . . 
    . 2 2 e b b e b b b e e b 4 2 2 . . . f . f f . 
    . 2 e b b b e b b b b e 2 2 2 2 . . f f f . . . 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . f f f f f f . 
    . e e e e e e f e e e f e 2 d d . . f f f . . . 
    . e e e e e e f e e f e e e 2 d . . . f . f f . 
    . e e e e e e f f f e e e e e e . . . . f . . . 
    . e f f f f e e e e f f f e e e . . . . . f . . 
    . . f f f f f e e f f f f f e . . . . . . . f . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `], [img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . . . . . . . . . 
    . . . 6 9 6 6 6 6 6 6 c 6 . . . . . . . . . . . 
    . . 6 c 9 6 6 6 6 6 6 c c 6 . . . . . . . . . . 
    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d . . . . . . . . 
    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 . . . . . . . . 
    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 . . . . . . . . 
    . 6 8 b b b 8 b b b b 8 6 6 6 6 . . . . . . . . 
    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 . . . . . . . . 
    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d . . . . . . . . 
    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d . . . . . . . . 
    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 . . . . . . . . 
    . 8 f f f f 8 8 8 8 f f f 8 8 8 . . . . . . . . 
    . . f f f f f 8 8 f f f f f 8 . . . . . . . . . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . . . . . . . . . 
    . . . 6 9 6 6 6 6 6 6 c 6 . . . . . . . . . . . 
    . . 6 c 9 6 6 6 6 6 6 c c 6 . . . . . . . . f . 
    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d . . . . . f . . 
    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 . . . . f . . . 
    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 . . . f . f f . 
    . 6 8 b b b 8 b b b b 8 6 6 6 6 . . f f f . . . 
    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 . f f f f f f . 
    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d . . f f f . . . 
    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d . . . f . f f . 
    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 . . . . f . . . 
    . 8 f f f f 8 8 8 8 f f f 8 8 8 . . . . . f . . 
    . . f f f f f 8 8 f f f f f 8 . . . . . . . f . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `], [img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . . . . . . . . . 
    . . . 3 d 3 3 3 3 3 3 c 3 . . . . . . . . . . . 
    . . 3 c d 3 3 3 3 3 3 c c 3 . . . . . . . . . . 
    . 3 c c d d d d d d 3 c c d 3 d . . . . . . . . 
    . 3 c 3 a a a a a a a b c d 3 3 . . . . . . . . 
    . 3 3 a b b a b b b a a b d 3 3 . . . . . . . . 
    . 3 a b b b a b b b b a 3 3 3 3 . . . . . . . . 
    . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 . . . . . . . . 
    . a a a a a a f a a a f a 3 d d . . . . . . . . 
    . a a a a a a f a a f a a a 3 d . . . . . . . . 
    . a a a a a a f f f a a a a a a . . . . . . . . 
    . a f f f f a a a a f f f a a a . . . . . . . . 
    . . f f f f f a a f f f f f a . . . . . . . . . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . . . . . . . . . 
    . . . 3 d 3 3 3 3 3 3 c 3 . . . . . . . . . . . 
    . . 3 c d 3 3 3 3 3 3 c c 3 . . . . . . . . f . 
    . 3 c c d d d d d d 3 c c d 3 d . . . . . f . . 
    . 3 c 3 a a a a a a a b c d 3 3 . . . . f . . . 
    . 3 3 a b b a b b b a a b d 3 3 . . . f . f f . 
    . 3 a b b b a b b b b a 3 3 3 3 . . f f f . . . 
    . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 . f f f f f f . 
    . a a a a a a f a a a f a 3 d d . . f f f . . . 
    . a a a a a a f a a f a a a 3 d . . . f . f f . 
    . a a a a a a f f f a a a a a a . . . . f . . . 
    . a f f f f a a a a f f f a a a . . . . . f . . 
    . . f f f f f a a f f f f f a . . . . . . . f . 
    . . . f f f . . . . f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . 
    `]]
if (blockSettings.exists("HONK!:SelectedCarImage")) {
    SelectedCarImage = blockSettings.readNumber("HONK!:SelectedCarImage")
} else {
    SelectedCarImage = 0
}
Car.setImage(CarImages[SelectedCarImage][0])
game.onUpdate(function () {
    if (Car.x > 24 * 16) {
        Car.x = 5 * 16
        if (!(Splash)) {
            Car.vx += 8
            RandomNumber = randint(0, 4)
            for (let Index = 0; Index <= 4; Index++) {
                if (Index == RandomNumber) {
                    summon_slow_car(Car.vx * 0.333, randint(SlowCarHonks, SlowCarHonks + 3), 11, Index + 2)
                } else {
                    summon_slow_car(Car.vx * 0.333, randint(SlowCarHonks + 4, SlowCarHonks + 14), 11, Index + 2)
                }
            }
            if (Math.percentChance(30)) {
                summon_coin(11, randint(0, 4) + 2)
            }
            if (Math.percentChance(20)) {
                summon_heart(11, randint(0, 4) + 2)
            }
            if (Math.percentChance(10)) {
                summon_powerup_extra_noise(11, randint(0, 4) + 2)
                SlowCarHonks += randint(1, 3)
            }
        }
    }
    if (Car.y < 16 * 3) {
        HonkPos = 0
    } else if (Car.y < 16 * 4) {
        HonkPos = 1
    } else if (Car.y < 16 * 5) {
        HonkPos = 2
    } else if (Car.y < 16 * 6) {
        HonkPos = 3
    } else {
        HonkPos = 4
    }
})
game.onUpdate(function () {
    for (let SlowCar of SlowCars) {
        SlowCar.say(convertToText(sprites.readDataNumber(SlowCar, "Num")))
        if (sprites.readDataNumber(SlowCar, "Num") <= 0 && sprites.readDataBoolean(SlowCar, "Destroy")) {
            SlowCar.destroy(effects.halo, 100)
            music.magicWand.play()
            for (let SlowCar of SlowCars) {
                sprites.setDataBoolean(SlowCar, "Destroy", false)
            }
        }
    }
})
forever(function () {
    if (Splash) {
        imagemorph.morph(SplashScreen, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . 1 . . . . . 6 6 6 6 6 6 6 6 . . . . . . 
            . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . . f f . . f f . . f f f . . f . . . f . f f f . f . f . f f f . f f f . f f f . f f . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 4 2 2 2 2 2 2 c 2 . . . . . . . . . . . . . . . . 1 1 1 . . . . 6 9 6 6 6 6 6 6 c 6 . . . . . 
            . . f f . . . . f f . . . . f f f f . . . . f f f . . . . f f . . f f . . . f f f . . f f . . f . f . . f f . f f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 c 4 2 2 2 2 2 2 c c 2 . . . . . . . . . . f . . d d 1 1 . . . . 6 c 9 6 6 6 6 6 6 c c 6 . . . . 
            . . f f . . . . f f . . f f . . . . f f . . f f f f . . . f f . . f f . . f f f . . . f f . . f f f . . f . f . f . f f f . f f . . f f f . f . . . f . f . f . f . f f f . . . . . . . . . . . . . . . . . . . . . . . . . 2 c c 4 4 4 4 4 4 2 c c 4 2 d . . . . . . . f . . . d . 1 . . . . 6 c c 9 9 9 9 9 9 6 c c 9 6 d . . 
            . . f f . . . . f f . . f f . . . . f f . . f f f f f . . f f . . f f . f f f . . . . f f . . f . f . . f . . . f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 c 2 e e e e e e e b c 4 2 2 . . . . . . f f f . . d d 1 1 . . . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 . . 
            . . f f . . . . f f . . f f . . . . f f . . f f . f f f . f f . . f f f f f . . . . . f f . . f . f . . f . . . f . f . f . f . f . f f f . f f f . f f f . f f . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . 2 2 e b b e b b b e e b 4 2 2 . . . . f f f . . . . 1 d d d 1 . . 6 6 8 b b 8 b b b 8 8 b 9 6 6 . . 
            . . f f f f f f f f . . f f . . . . f f . . f f . . f f f f f . . f f f f . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 e b b b e b b b b e 2 2 2 2 . . . f f f f f f . . 1 d d 1 d . . 6 8 b b b 8 b b b b 8 6 6 6 6 . . 
            . . f f f f f f f f . . f f . . . . f f . . f f . . . f f f f . . f f f f . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 . . f f f . . . . . . 1 1 d d 1 1 . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 . . 
            . . f f . . . . f f . . f f . . . . f f . . f f . . . . f f f . . f f f f f . . . . . f f . . f f f . f f f . f f f . f f f . f f . . f f f . . f f f f . f f f . f . . . f . . . f f f . f f f . f . . . f . f f f . . . . e e e e e e f e e e f e 2 d d . . . f f f f f f . . 1 1 d 1 1 1 . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d . . 
            . . f f . . . . f f . . f f . . . . f f . . f f . . . . . f f . . f f . f f f . . . . f f . . f . f . f . f . f . . . f . f . f . f . f . . . . . . f . . f . f . f f . f f . . f . . . . f . f . f f . f f . f . . . . . . e e e e e e f e e f e e e 2 d . . . . f f f . . . . . 1 d . . . . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d . . 
            . . f f . . . . f f . . f f . . . . f f . . f f . . . . . f f . . f f . . f f f . . . . . . . f f f . f f . . f . . . f f f . f . f . f f f . . . . f . . f f f . f . f . f . . f . f . . f f f . f . f . f . f f f . . . . e e e e e e f f f e e e e e e . . . . . . f f f . . . 1 . d . . . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 . . 
            . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . f f f . . f f . . f . f . f . f . f . . . f . f . f . f . f . . . . f . f . . f . f . f . . . f . . f . . f . f . f . f . . . f . f . . . . . . e f f f f e e e e f f f e e e . . . . . . . f . . . . 1 1 d d . . 8 f f f f 8 8 8 8 f f f 8 8 8 . . 
            . . f f . . . . f f . . . . f f f f . . . . f f . . . . . f f . . f f . . . . f f . . f f . . f . f . f . f . f f f . f . f . f f . . f f f . . f f f . . f . f . f . . . f . . . f f f . f . f . f . . . f . f f f . . . . . f f f f f e e f f f f f e . . . . . . . . . f . . . . 1 1 d d . . f f f f f 8 8 f f f f f 8 . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f . . . . f f f f . . . . . . . . . . . . . . . . 1 1 1 1 . . f f f . . . . f f f f . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . . f . . . f . f f f . f . f . f f f . f f f . f f f . f f . . f f f . . f f f . f f . . f f f . f f f . f f . . f f f . . . f f f . f f f . f . . . f . f f f . . f f . . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f f . f f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . f . f . f . f . f . . . f . f . f . f . f . . . . f . . . . f . f . f f . f f . f . . . . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . . f . f . f . f f f . f f . . f f f . f . . . f . f . f . f . f f f . . f f f . f f . . f . . . f f f . f . f . f f f . . f . f . . f f f . f . f . f . f f f . . f f . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f . . . f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . f . f . f . f . f . . . f . f . f . f . f . . . . f . . f . f . f . f . . . f . f . . . . f . f . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f . . . f . f . f . f . f . f f f . f f f . f f f . f f . . f f f . . f . f . f . f . f f f . f . f . f f . . f f f . . . f f f . f . f . f . . . f . f f f . . f f . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . . f . f f f . f f f . . f f f . f . . f . f f f . f f . . . . . . f f f . f f . . f f . . f . f . f f f . f . . f . f f f . . f f f . f . . f . . f f f . f . f . f f f . . f . . . f . f f f . f . f . f f f . f f f . f f f . f f . . f f f . . f f f . f f f . f f . . f . f . f . . . f . f f f . . . . . . 
            . . f . f . f f . f . f . . . . f . . f . . . . f f . f . f . . . f . f . . . . . f . f . f . f . f . f . f . f . . f . . f f . f . f . f . . f . f . f f . f . . . f . . f . f . f . . . . f f . f f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . f . . . f . f . f . f . f . f . f f . f f . f . . . . . . . . 
            . . f . f . f . f f . f f f . . f . . f . f . . f . f f . f f f . f . f . . . . . f f f . f f . . f . f . f . f . . f . . f . f f . f . f . . f . f . f . f f . . . f . . f f f . f f f . . f . f . f . f f f . f f . . f f f . f . . . f . f . f . f . f f f . . f f f . f . f . f f . . f . f . f . f . f . f f f . . . . . . 
            . . f . f . f . . f . . . f . . f . . f . . f . f . . f . f . . . f . f . . . . . f . f . f . f . f . f . f . f . . f . . f . . f . f . f . . f . f . f . . f . . . f . . f . f . f . . . . f . . . f . f . f . f . f . f . . . f . . . f . f . f . f . f . . . . f . . . f . f . f . f . f . f . f . . . f . . . f . . . . . . 
            . . f f f . f . . f . f f f . f f f . . f f f . f . . f . f f f . f f . . f f f . f . f . f . f . f f . . f f f . f f f . f . . f . f f f . . f f f . f . . f . . . f . . f . f . f f f . . f . . . f . f . f . f . f . f f f . f f f . f f f . f f . . f f f . . f . . . f f f . f . f . f f f . f . . . f . f f f . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f f f . . . . . f . f f . . f f f . f . f . f . f . . f . . f f f f . f f f . f . f . f f f . f f f . f f f . f f f . f . f . . . . . f . f f . . . . . . f f f . f f f . f f . . . . . . f . f f f . f f . . f f . . f f f . f . f . f . . f . f . f f f . f . f . f f f . . . . . f . . . . . . . . . . . . . . . 
            . . f . f . f . f . . . . f . . f . f . f . f . f . f . f . f f . f . . . . f . . f . f . f . f . f . . . . f . . . f . . f . . . f . f . . . . f . . f . f . . . . . f . f . f . f . f . f . . . . f . . f . f . f . f . f . f . f . f . f . f . f . . f . f . f . . . f . f . f . . . . . . f . . . . . . . . . . . . . . . . 
            . . f . f . f f f . . . f . . . f . f . f . f . f . f . f . f . f f . . . . f . . f . f . . f . . f f f . . f . . . f . . f . . . f f . . . . f . . . f . f . f f f . f f f . f f f . f . f . . . f . . . f f f . f f . . f f . . f . f . f . f . f . . f f . . f f f . . f . . f f f . . . f . . . . . . . . . . . . . . . . . 
            . . f . f . f . . . . f . . . . f . f . f . f . f . f . f . f . . f . . f . f . . f . f . . f . . . . f . . f . . . f . . f . . . f . f . . f . . . . f . f . . . . . f . . . f . f . f . f . . f . . . . f . f . f . f . f . f . f . f . f . f . f . . f . f . f . . . . f . . . . f . . f . . . . . . . . . . . . . . . . . . 
            . . f f f . f . . . f . . . . . f f . . f f f . . f . f . . f . . f . . f f f . . f f f . . f . . f f f . . f . . f f f . f f f . f . f . f . . . . . f f . . . . . . f . . . f . f . f f . . f . . . . . f . f . f . f . f . f . f f f . . f . f . . . f . f . f f f . . f . . f f f . f . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f f f . f f f . f f . . . f . f . f f f . f . f . f f f . . . . f f f . f . f . f . f f f . f f f . f f f . f . f . . f . . . f f f . f . . f . f f f . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f . f . f . . . f . f . . f . f . f . . . f . f . f . . . f . . f . . . f . f . f . . f . . . f . . f . . . f . f . . f . . . f . f . f f . f . f . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f f f . f f f . f . f . . f f . . f f f . . f . . f f f . . . . f f f . f . f . f . . f . . . f . . f . . . f f f . . f . . . f f f . f . f f . f f f . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f . f . . . f . f . f . . f . f . f . . . . f . . . . f . f . . . . f . f . f . f . . f . . . f . . f . . . f . f . . f . . . f . f . f . . f . f . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . f . f . . f . f . f f f . f f . . . f . f . f f f . . f . . f f f . . . . f f f . . f . f . . f f f . . f . . f f f . f . f . . f f f . f . f . f . . f . f f f . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . . f f . . f . f . f f f . f f f . f f f . f . . f . . . . . f . f f f . f f f . f f f . f f f . f f f . . f f . . f f f . f f . . . . . . f . f f f f . . f . f . f f f . f . f . . . . . f . f f f f . . f . f . f f f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f . f . f . f . . f . . . f . . f . f . f f . f . . . . f . . f . . . f . f . f . f . f . . . f . . . . f . f . f . f . f . f . . . . f . . f . . f . . f . f . f . . . f . f . . . . f . . . . . f . . f . f . f . . . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . . f f . . f . f . . f . . . f . . f . f . f . f f . . . f . . . f f f . f f f . f f f . f . . . f f f . . f f . . f f f . f f . . . . f . . . f . . f . . f f . . f f f . . f . . . . f . . . . . f . . . f f . . f f f . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f . f . f . f . . f . . . f . . f . f . f . . f . . f . . . . . . f . f . . . f . f . f . . . f . . . . f . f . f . f . f . f . . f . . . . f . . f . . f . f . f . . . . f . . . f . . . . . f . . . . f . f . f . . . . f . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . . f f . . f f f . . f . . . f . . f f f . f . . f . f . . . . . f f f . f . . . f . f . f f f . f f f . . f f . . f . f . f . f . f . . . . . f f f f . . f . f . f f f . . f . . f . . . . . f f f f . . f . f . f f f . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f f f . f . . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f . f f . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . f . f . f . f f . f f . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f . f . f . . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f . f . f f f . f . . f . f . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
        pause(5000)
        imagemorph.morph(SplashScreen, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . f f . . f f f . f f f . f f f . . f f f . f . f . f f f . . f f f . . f f . . f . f . f f f . f f f . f f f . f . . f . . . . . f . f f f . f f f . f f f . f f f . f f f . . f f . . f f f . f f . . . . . . f . f f f f . . f . f . f f f . f . f . . f f f . f f f . . f f f . f f f . f f f . f f . . f f f . . 
            . . f . f . f . f . f . . . f . . . f . . . . . f . . f . f . f . . . . f . f . . f . f . f . f . . f . . . f . . f . f . f f . f . . . . f . . f . . . f . f . f . f . f . . . f . . . . f . f . f . f . f . f . . . . f . . f . . f . . f . f . f . . . f . f . . . f . . f . f . . f . . . . f . . f . f . f . f . . f . . . 
            . . f f f . f f . . f f f . f f f . f f f . . . f . . f f f . f f f . . f f f . . f f . . f . f . . f . . . f . . f . f . f . f f . . . f . . . f f f . f f f . f f f . f . . . f f f . . f f . . f f f . f f . . . . f . . . f . . f . . f f . . f f f . . f . . . . f . . f . f . . f f f . . f . . f f f . f f . . . f . . . 
            . . f . . . f . f . f . . . . . f . . . f . . . f . . f . f . f . . . . f . f . . f . f . f . f . . f . . . f . . f . f . f . . f . . f . . . . . . f . f . . . f . f . f . . . f . . . . f . f . f . f . f . f . . f . . . . f . . f . . f . f . f . . . . f . . . . f . . f . f . . . . f . . f . . f . f . f . f . . f . . . 
            . . f . . . f . f . f f f . f f f . f f f . . . f . . f . f . f f f . . f . f . . f f . . f f f . . f . . . f . . f f f . f . . f . f . . . . . f f f . f . . . f . f . f f f . f f f . . f f . . f . f . f . f . f . . . . . f f f f . . f . f . f f f . . f . . . . f . . f f f . . f f f . . f . . f . f . f . f . . f . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . f f f . f . f . f f f . . . f f f . f f f . f . . . f . f f f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . f . . f . f . f . . . . f . . . . f . f . f f . f f . f . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . f . . f f f . f f f . . f . f . . f f f . f . f . f . f f f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . f . . f . f . f . . . . f . . f . f . f . f . . . f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . f . . f . f . f f f . . . f f f . f . f . f . . . f . f f f . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `)
        pause(5000)
    }
})
forever(function () {
    Song = []
    Durations = []
    add_measures_1_7()
    for (let Note2 of [659, 587, 659, 740]) {
        add_note(Note2, music.beat(BeatFraction.Whole))
    }
})
