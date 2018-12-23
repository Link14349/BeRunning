"use strict";

class Plugin
{
    constructor() {}
    Export(name, bind_class, value) {
        this[name] = {
            bind: bind_class,
            value: value
        };
    }
}