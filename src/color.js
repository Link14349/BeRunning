"use strict";

!function () {
    let color = new Plugin();
    function hex(rgb) {
        if (typeof rgb == "string") {
            rgb = obj_rgb(rgb);
        }
        let red = rgb.r;
        let green = rgb.g;
        let blue = rgb.b;
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        if (red.length == 1)
            red = red + red;
        if (green.length == 1)
            green = green + green;
        if (blue.length == 1)
            blue = blue + blue;
        let hex = {
            r: red,
            g: green,
            b: blue,
        };
        hex.toString = function (){
            return "#" + this.r + this.g + this.b;
        };
        return hex;
    }
    function rgb(hex) {
        if (typeof hex == "object")
            hex = hex.toString();
        if (hex.length != 4 && hex.length != 7)// hex first is "#"
            return NaN;
        hex = hex.split("");
        let tmp = [];
        for (var i = 1 ; i < hex.length ; i++)// rm hex[0]
            tmp.push(hex[i]);
        hex = tmp;
        let rgb = {r: 0,g: 0,b: 0};
        if (hex.length == 3){
            rgb.r = parseInt(hex[0] + hex[0],16);
            rgb.g = parseInt(hex[1] + hex[1],16);
            rgb.b = parseInt(hex[2] + hex[2],16);
        } else {
            rgb.r = parseInt(hex[0] + hex[1],16);
            rgb.g = parseInt(hex[2] + hex[3],16);
            rgb.b = parseInt(hex[4] + hex[5],16);
        }
        rgb.toString = function (){
            let string = "rgb(";
            string += this.r + ",";
            string += this.g + ",";
            string += this.b + ")";
            return string;
        };
        return rgb;
    }
    function obj_rgb(str_rgb) {
        let rgb = {};
        let arr_rgb = str_rgb.split("(")[1].split(")")[0].split(",");
        rgb.r = arr_rgb[0];
        rgb.g = arr_rgb[1];
        rgb.b = arr_rgb[2];
        rgb.toString = function (){
            let string = "rgb(";
            string += this.r + ",";
            string += this.g + ",";
            string += this.b + ")";
            return string;
        };
        return rgb;
    }
    function obj_hex(str_hex) {
        let h = rgb(str_hex);
        h = hex(h);
        return h;
    }
    color.Export("hex", BeRunning.global, hex);
    color.Export("obj_hex", BeRunning.global, obj_hex);
    color.Export("rgb", BeRunning.global, rgb);
    color.Export("obj_rgb", BeRunning.global, obj_rgb);
    BeRunning.Export("BR", color, "color");
}();