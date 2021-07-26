scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . 2 2 . . . . . . . . . . . . .
    . . 2 2 7 7 7 4 4 1 . . . . . .
    . . 2 2 2 . . . . . . . . . . .
    6 2 2 2 2 2 4 4 . . . . . . . .
    6 3 2 2 2 2 2 2 2 a a 6 6 . . .
    6 3 2 2 2 2 2 2 2 2 a a a 6 . .
    6 3 3 2 2 2 2 2 2 2 2 2 2 2 2 2
    6 b b b 2 2 2 4 6 6 6 6 6 6 6 .
    . . 2 2 2 2 4 . . . . . . . . .
    . . 2 2 2 4 . . . . . . . . . .
    . . 2 2 4 . . . . . . . . . . .
    . . 2 2 7 7 7 4 4 1 . . . . . .
    . 2 2 . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b . . . . . . . . . . . .
            b b b b b b . . . . . . . . . .
            7 7 7 7 7 7 7 7 7 7 1 1 1 . . .
            b b b b b b 7 7 7 7 7 1 1 1 1 .
            7 7 7 7 7 7 7 7 7 7 1 1 1 . . .
            b b b b b b . . . . . . . . . .
            b b b b . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . b . . . .
        . . . . . . . . . . b b . . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . b b b b . . . .
        . . . f f 3 3 3 3 3 3 3 3 3 2 .
        . . 6 6 6 6 6 6 6 6 6 6 6 6 2 .
        . b b b b b b b b b b b b b 2 .
        . . . . . . b b b b b b . . . .
        . . . . . . . b b b b b . . . .
        . . . . . . . . b b b b . . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . . . b b . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, 0)
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
