"use strict";

class BeRunning
{
    static VERSION() {
        return "BeRunning-v0.0.1";
    }
    constructor(id) {
        console.log(BeRunning.VERSION());
        this._dom = document.getElementById(id);
        this._ctx = this._dom.getContext("2d");
        this._screen_x = 0;
        this._screen_y = 0;
        this._items = [];
        this._scale = 1.0;
        this._values = {};
        this.KEY_DOWN = 1;
        this.KEY_UP = 2;
        this.KEY_PRESS = 3;
        this._focal = null;
        this._audios = {};
    }
    width(w) {
        if (w) {
            this._dom.width = w;
            return this;
        }
        return this._dom.width;
    }
    height(h) {
        if (h) {
            this._dom.height = h;
            return this;
        }
        return this._dom.height;
    }
    x(x) {
        if (x !== undefined) {
            this._screen_x = x;
            return this;
        }
        return this._screen_x;
    }
    y(y) {
        if (y !== undefined) {
            this._screen_y = y;
            return this;
        }
        return this._screen_y;
    }
    size(w, h) {
        return this.width(w).height(h);
    }
    scale(s) {
        if (s) {
            this._scale = s;
            return this;
        }
        return this._scale;
    }
    full() {
        this.width(window.innerWidth).height(window.innerHeight);
        this._dom.style.width = "100%";
        this._dom.style.height = "100%";
        this._dom.style.display = "block";
        let th = this;
        window.onresize = function () {
            th.width(window.innerWidth).height(window.innerHeight);
        }
    }
    bind(item) {
        this._items.push(item);
        item.bind(this);
        this._items.sort(function (a, b) {
            return a.layer() - b.layer()
        });
    }
    ctx() {
        return this._ctx;
    }
    update() {
        let th = this;
        this.ctx().clearRect(0, 0, this.width(), this.height());
        for (let i = 0 ; i < th._items.length ; i++) {
            th._items[i].render();
        }
        return this;
    }
    move(x ,y) {
        return this.x(x).y(y);
    }
    render(callback) {
        let th = this;
        requestAnimationFrame(function step () {
            th.update();
            // console.log(th);
            if (th._focal) {
                th.move(th._focal.x() - th.width() / 2 + th._focal.width(), th._focal.y() - 300);
            }
            if (callback) callback(th);
            requestAnimationFrame(step);
        });
        return this;
    }
    key(type, callback) {
        if (type = this.KEY_DOWN) {
            // console.log(arguments);
            document.onkeydown = function (e) {
                callback(e, this)
            };
        }
        if (type = this.KEY_PRESS) {
            document.onkeypress = function (e) {
                callback(e, this)
            };
        }
        if (type = this.KEY_UP) {
            document.onkeyup = function (e) {
                callback(e, this)
            };
        }
    }
    focal(item) {
        if (item) {
            this._focal = item;
            return this;
        }
        return this._focal;
    }
    set(attr, value) {
        this._values[attr] = value;
        return this;
    }
    get(attr) {
        return this._values[attr];
    }
    load_audios(audios) {
        for (let i in audios) {
            let a = new Audio(audios[i]);
            a.load();
            // console.log(a);
            this._audios[audios[i]] = a;
        }
    }
    itemLen() {
        return this._items.length;
    }
    play(audio, callback) {
        // console.log(this._audios);
        let a = this._audios[audio];
        if (!a) {
            console.error("Load audio " + this.audios[i] + " failed.");
            return false;
        }
        for (let i = 1 ; i < arguments.length ; i++) {
            if (arguments[i] == "loop") {
                a.loop = true;
            }
        }
        // while (a.readyState != 4) {}
        let checker = setInterval(function () {
            if (a.readyState == 4) {
                a.play();
                clearInterval(checker);
            }
        }, 100);
        a.onended = function () {
            if (callback && typeof callback == "function") {
                callback();
            }
        }
    }
}