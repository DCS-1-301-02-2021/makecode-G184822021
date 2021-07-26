scene.set_background_color(8)
spacePlane=sprites.create(img("""
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
"""),SpriteKind.player)
info.set_life(3)
spacePlane.set_stay_in_screen(True)
controller.move_sprite(spacePlane, 200, 200)
def on_a_pressed():
    missile=sprites.create_projectile_from_sprite(
        img("""
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
        """), spacePlane, 200, 0)
controller.A.on_event(
    ControllerButtonEvent.PRESSED, on_a_pressed)
spacePlane.set_stay_in_screen(True)  
controller.move_sprite(spacePlane, 200, 200)  
def on_update():
    bogy=sprites.create(img("""
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
    """),
        SpriteKind.enemy)   
    bogy.set_velocity(-100, 0)
    bogy.y=randint(0, scene.screen_height())
    bogy.left=scene.screen_width()
    bogy.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(500, on_update)
def on_hit(sprite, othersprite):
    othersprite.destroy(effects.fire, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_hit)
def on_crash(sprite, othersprite):
    othersprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_crash)