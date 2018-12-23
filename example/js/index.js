let map = [
    {
        type: "wall",
        x: -screen.width,
        y: screen.height / 2 + 200,
        width: 20,
        height: 2,
        material: "images/wall.jpeg",
    },
    {
        type: "wall",
        x: -screen.width + 2000,
        y: screen.height / 2,
        width: 20,
        height: 2,
        material: "images/wall.jpeg",
    }
];

let game = new BeRunning("main");
game.full();
let me = new Item("me", 0, 0, 140, 400, 100, "images/me-stop-left.png");
let window_ = new BRWindow("win", 0, 0, 100);

// me.rotate(Math.PI / 180 * 20);
let bgm_index = 0;
let bgm = [
    "sounds/Shadow Ninja d.wav"
];
const COOLING_TIMES = {
    "dart": 1
};
let coolingTimes = {
    "dart": 0
};
game.load_audios(bgm);
game.load_audios([
    "sounds/broke.mp3",
    "sounds/money.mp3",
    "sounds/wall.mp3",
    "sounds/blood.mp3"
]);
game.play(bgm[bgm_index], function player() {
    bgm_index++;
    bgm_index %= bgm.length;
    game.play(bgm[bgm_index], player);
});
me.material("images/me-run-left.png");
me.material("images/me-run-right.png");
me.material("images/me-stop-right.png");
me.set("vy", 0);
me.set("vx", 0);
game.move(-game.width() / 2 + me.width() / 2,-300);
game.bind(me);
game.focal(me);
init();
let test = 0;
game.render(function () {
    if (me.get("vs") === 0)
        me.set("vy", 1);
    // console.log(me.get("vy"));
    // console.log(me.get("vx"));
    if (me.collision_find_name("block")) {
        me.set("vy", 0);
        for (var i = 0 ; i < 15 ; i++) {
            me.up(1);
            if (!me.collision_find_name("block")) break;
        }
        me.set("vx", 0);
        // return;
    }
    me.x(me.x() + me.get("vx"));
    me.y(me.y() + me.get("vy"));
    me.set("vy", me.get("vy") + 1);
    test++;
    if (me.get("vx") > 0) {
        if (test >= 10) {
            if (me.material().search("right") > -1) {
                me.material("images/me-stop-right.png");
            } else {
                me.material("images/me-stop-left.png");
            }
            test = 0;
        }
    }
});
game.key(game.KEY_DOWN, function (e, th) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 39:// right
            // me.right(15);
            me.set("vx", 15);
            me.material("images/me-run-right.png");
            test = 0;
            break;
        case 37:// left
            // me.left(15);
            me.set("vx", -15);
            me.material("images/me-run-left.png");
            test = 0;
            break;
        case 38:// up
            me.set("vy", me.get("vy") - 15);
            me.down(me.get("vy"));
            break;
        case 32:// space
            if (coolingTimes["dart"] == 0) {
                let dart = new Item("dart", me.x() + me.width() * 2, me.y() + 100, 30, 30, 10, "images/dart.png");
                game.bind(dart);
                let timmer = setInterval(function () {
                    dart.x(dart.x() + 10);
                    if (dart.x() > me.x() + 5000) {
                        dart.destory(true);
                        clearInterval(timmer);
                    }
                }, 10);
                coolingTimes["dart"] = COOLING_TIMES["dart"];
            }
            break;
    }
});
setInterval(function () {
    for (let i in coolingTimes) {
        if (coolingTimes[i] > 0) coolingTimes[i]--;
    }
}, 1000);

function init() {
    for (let i in map) {
        let item = map[i];
        switch (item.type) {
            case "wall":
                for (let y = 0 ; y < item.height ; y++) {
                    for (let x = 0 ; x < item.width ; x++) {
                        let _x = item.x + x * 100;
                        let _y = item.y - y * 100;
                        let block = new Item("block", _x, _y, 100, 100, 1, item.material);
                        game.bind(block);
                    }
                }
                break;
        }
    }
}
