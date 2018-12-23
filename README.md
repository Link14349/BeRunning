BeRunning
==============

This is a lightweight mobile background AG game engine based on canvas.  
Any issues? Go to [ISSUES](https://github.com/qianduanXIAOHAOZI/BeRunning/issues)  
Getting started? [See summary.md for details](SUMMARY.md).  

CDN
------
[https://raw.githubusercontent.com/qianduanXIAOHAOZI/BeRunning/master/src/BeRunning-v-0.0.1.min.js](https://raw.githubusercontent.com/qianduanXIAOHAOZI/BeRunning/master/src/BeRunning-v-0.0.1.min.js)
[https://raw.githubusercontent.com/qianduanXIAOHAOZI/BeRunning/master/src/BeRunning-v-0.0.1.js](https://raw.githubusercontent.com/qianduanXIAOHAOZI/BeRunning/master/src/BeRunning-v-0.0.1.js)

Release
-----------
[BeRunning-v-0.0.1.js](release/BeRunning-v-0.0.1.js)
[BeRunning-v-0.0.1.min.js](release/BeRunning-v-0.0.1.min.js)

Usage
-----------
See [Hello world](doc/usage/first-game.md)
```javascript
let game = new BeRunning("main");
let block = new Item("block", -100, 0, 100, 100, 1, "../../example/images/wall.jpeg");
game.bind(block);
game.full();
  
game.render(function () {
    block.x(block.x() + 5);
    if (block.x() > game.width()) block.x(-100);
});
```

License
----------
[MIT license](LICENSE)