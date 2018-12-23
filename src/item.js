"use strict";

class Item
{
    constructor(name, x, y, width, height, layer, material) {
        this._name = name;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._layer = layer;
        this._parent = null;
        this._material_finish = false;
        if (material !== BeRunning.selfCreate) {
            this._material = new Image();
            this._material.src = material;
            this._material.onload = function () {
                th._material_finish = true;
            }
        } else {
            this._material_finish = true;
        }
        this._values = {};
        this._audios = {};
        this._rotate = 0;
        this._destory = false;
        let th = this;
    }
    name() {
        return this._name;
    }
    material(material) {
        if (material) {
            this._material = new Image();
            this._material.src = material;
            this._material_finish = false;
            let th = this;
            this._material.onload = function () {
                th._material_finish = true;
            };
            return this;
        }
        return this._material.src;
    }
    width(w) {
        if (w) {
            this._width = w;
            return this;
        }
        return this._width;
    }
    height(h) {
        if (h) {
            this._height = h;
            return this;
        }
        return this._height;
    }
    x(x) {
        if (x !== undefined) {
            this._x = x;
            return this;
        }
        return this._x;
    }
    y(y) {
        if (y !== undefined) {
            this._y = y;
            return this;
        }
        return this._y;
    }
    move(x ,y) {
        return this.x(x).y(y);
    }
    layer(n) {
        if (n) {
            this._layer = n;
            return this;
        }
        return this._layer;
    }
    bind(parent) {
        this._parent = parent;
    }
    render() {
        if (this._destory) return this;
        if (!this._parent) return this;
        if (!this._material_finish) return this;
        let x = (this._x - this._parent.x()) * this._parent.scale();
        let y = (this._y - this._parent.y()) * this._parent.scale();
        let ctx = this._parent.ctx();
        ctx.rotate(this._rotate);
        // height * sin(r)
        // height * cos(r)
        x += this.height() * Math.cos(this._rotate) / 2;
        y -= this.height() * Math.sin(this._rotate);
        if (this._material === BeRunning.selfCreate) {
            this["customize-render"](ctx);
        } else {
            ctx.drawImage(
                this._material,
                x, y,
                this._width * this._parent.scale(), this._height * this._parent.scale()
            );
        }
        for (let i in this) {
            if (
                typeof this[i] == "function" &&
                    i.search(/-render$/) > -1 &&
                    i !== "customize-render"
            ) {
                this[i]();
            }
        }
        ctx.rotate(-this._rotate);
        return this;
    }
    set(attr, value) {
        this._values[attr] = value;
        return this;
    }
    get(attr) {
        return this._values[attr];
    }
    collision(item) {
        if (item.type() == "control") return false;
        return (
            item.x() <= this.x() && item.x() + item.width() >= this.x() &&
            item.y() <= this.y() && item.y() + item.height() >= this.y()
        );
    }
    collision_find(com) {
        let items = this._parent._items;
        for (let i in items) {
            if (com(items[i]) && items[i].collision(this)) {
                return true;
            }
        }
        return false;
    }
    collision_find_name(name) {
        return this.collision_find(function (i) {
            return i.name() == name
        });
    }
    collision_find_val(com) {
        let items = this._parent._items;
        for (let i in items) {
            if (com(items[i]) && items[i].collision(this)) {
                return items[i];
            }
        }
        return null;
    }
    collision_find_val_name(name) {
        return this.collision_find_val(function (i) {
            return i.name() == name
        });
    }
    collision_find_list_val(com) {
        let items = this._parent._items;
        let list = [];
        for (let i in items) {
            if (com(items[i]) && items[i].collision(this)) {
                list.push(items[i]);
            }
        }
        return list;
    }
    collision_find_list_val_name(name) {
        return this.collision_find_list_val(function (i) {
            return i.name() == name
        });
    }
    left(s) {
        return this.x(this.x() - s);
    }
    right(s) {
        return this.x(this.x() + s);
    }
    up(s) {
        return this.y(this.y() - s);
    }
    down(s) {
        return this.y(this.y() + s);
    }
    load_audios(audios) {
        for (let i in audios) {
            let a = new Audio(audios[i]);
            a.load();
            this._audios[audios[i]] = a;
        }
    }
    play(audio) {
        let a = this._audios[audio];
        if (!a) {
            console.error("Load audio " + audios[i] + " failed.");
            return false;
        }
        while (a.readyState) {}
        a.play();
    }
    rotate(angle) {
        if (angle === undefined) return this._rotate;
        this._rotate = angle;
        return this;
    }
    destory(flag) {
        if (flag)
            this._destory = true;
        else
            return this._destory;
    }
    type() {
        return "item";
    }
}

!function () {
    let BR_text = new Plugin();
    BR_text.Export("text", Item, function (txt, color, font, offset) {
        this._txt = txt;
        if (color === void(0)) {
            this._font_color = "#000";
        } else {
            this._font_color = color;
        }
        if (font === void(0)) {
            this._font = "bold 100px";
        } else {
            this._font = font;
        }
        if (font === void(0)) {
            this._offset = 0;
        } else {
            this._offset = offset;
        }
        return this;
    });
    BR_text.Export("text-render", Item, function () {
        let ctx = this._parent.ctx();
        // console.log(this);
        ctx.fillStyle = this._font_color;
        ctx.font = this._font;
        // console.log(this._txt, this._font_color, this._font_size);
        if (typeof this._offset == "number")
            ctx.fillText(this._txt, this.x() + this._offset, this.y() + this._offset);
        else
            ctx.fillText(this._txt, this.x() + this._offset.x, this.y() + this._offset.y);
        // console.log(ctx.font);
        return this;
    });
    BeRunning.Export("BR", BR_text);
    let materialCreator = new Plugin();
    materialCreator.Export("selfCreate", BeRunning.global, true);
    materialCreator.Export("customize", Item, function (customizeFun) {
        this._material = BeRunning.selfCreate;
        this._customize = customizeFun;
    });
    materialCreator.Export("customize-render", Item, function () {
        let ctx = this._parent.ctx();
        this._customize(ctx);
    });
    BeRunning.Export("BR", materialCreator);
}();