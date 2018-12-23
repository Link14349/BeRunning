"use strict";

class BRWindow extends Item
{
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height, 0, "../images/space.png");
        this._parent = null;
        this._fade = false;
        this._width = width;
        this._height = height;
        this._rotate = 0;
        this._controls = [];
    }
    push(ctrl) {
        this._controls.push(item);
    }
    bind(p) {
        if (p) {
            this._parent = p;
            this.layer(p.itemLen());
            return this;
        }
        return this._parent;
    }
    fade(f) {
        if (f === undefined) return this._fade;
        this._fade = f;
        return this;
    }
    render() {
        if (!this._parent) return this;
        if (!this._material_finish) return this;
        if (this._destory) return this;
        if (this._fade) return this;
        for (let i in this._controls) {
            this._controls.render();
        }
        return this;
    }
    hover(callback) {
        let th = this;
        this._parent._dom.onmousemove = function (e) {
            let x = e.offsetX, y = e.offsetY;
            if (
                x >= th.x() && x <= th.x() + th.width() &&
                y >= th.y() && y <= th.y() + th.height()
            ) {
                if (callback) callback(th);
            }
        };
    }
    click(callback) {
        let th = this;
        this._parent._dom.onclick = function (e) {
            let x = e.offsetX, y = e.offsetY;
            if (
                x >= th.x() && x <= th.x() + th.width() &&
                y >= th.y() && y <= th.y() + th.height()
            ) {
                if (callback) callback(th);
            }
        };
    }
    type() {
        return "window";
    }
}