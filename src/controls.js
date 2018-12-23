"use strict";

class Control extends Item
{
    constructor(name, x, y, size, icon) {
        super(name, x, y, size, size, 0, icon);
        this._parent = null;
        this._fade = false;
        this._size = size;
        this._rotate = 0;
    }
    bind(p) {
        if (p) {
            this._parent = p;
            this.layer(p.itemLen());
            return this;
        }
        return this._parent;
    }
    size(s) {
        if (s === undefined) return this._size;
        this._size = s;
        this.width(s).height(s);
        return this;
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
        let ctx = this._parent._ctx;
        ctx.rotate(this._rotate);
        ctx.drawImage(
            this._material,
            this.x(), this.y(),
            this._size, this._size
        );
        ctx.rotate(-this._rotate);
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
        return "control";
    }
}