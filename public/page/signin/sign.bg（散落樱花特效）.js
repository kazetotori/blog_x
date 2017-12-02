(function () {

    "use strict";
    /* 循环帧 */
    function gameloop() {
        requestAnimFrame(gameloop);
        var now = Date.now();
        deltaTime = now - lastTime;
        lastTime = now;
        drawBg();
        drawSakuras();
    }

    var itv = setInterval(function () {
        if (sakuras.length > maxSakuras) {
            alert('aaa');
            return clearInterval(itv);
        }
        for (var i = 0; i < 10; i++) {
            sakuras.push(new Sakura());
        }

    }, 1000)


    /* 画布大小随窗口大小变化 */
    function onresize() {
        h = cvs.height = $('body').height();
        w = cvs.width = $('body').width();
    }


    /* 填充绘制背景 */
    function drawBg() {
        ctx.fillStyle = '#FEFEFE';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
    }


    /* 绘制🌸樱花🌸 */
    function drawSakuras() {
        for (var i = 0; i < sakuras.length; i++) {
            sakuras[i].update();
            sakuras[i].draw();
        }
    }


    /**
     * 🌸 樱花花瓣类 🌸
     */
    function Sakura() {
        this.x = utils.randNum(-w / 2, w / 2);
        this.y = utils.randNum(-h, 0);
        this.xspd = utils.randNum(1, 3);
        this.yspd = utils.randNum(1, 3);
        this.timer;
        this.deg = 0;
        this.degSpd = Math.floor(utils.randNum(10, 30))
        this.vertices = [];
        var rand = utils.randNum(70, 120)
        for (let i = 0; i < 30; i++) {
            var step = i / rand * (Math.PI * 2); //设置心上面两点之间的角度，具体分成多少份，好像需要去试。
            var vector = {
                x: (15 * Math.pow(Math.sin(step), 3)),
                y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
            }
            this.vertices.push(vector);
        }
    }

    // 将樱花置于初始状态
    Sakura.prototype.init = function () {
        this.x = utils.randNum(-w / 2, w / 2);
        this.y = utils.randNum(-h, 0);
        this.timer = 0;
        this.xspd = utils.randNum(1, 3);
        this.yspd = utils.randNum(1, 3);
    }

    Sakura.prototype.update = function () {
        this.timer += deltaTime;
        this.x += this.xspd * deltaTime * 0.012;
        this.y += this.yspd * deltaTime * 0.012;

        if (this.x > w || this.y > h) {
            this.init();
        }
    }

    // 绘制樱花
    Sakura.prototype.draw = function () {
        ctx.save();
        ctx.strokeStyle = 'lightpink';
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        ctx.translate(-1000, this.y); //这一步跟ctx.shadowOffsetX必须一起使用，不明白为啥？
        for (let i = 0; i < 30; i++) {
            var vector = this.vertices[i];
            ctx.lineTo(vector.x + this.x, vector.y + this.y);
        }
        ctx.shadowColor = "lightpink";
        ctx.shadowOffsetX = this.x + 1000;
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }



    /*  main  */

    var utils = {
        randNum: function (min, max) {
            return (Math.random() * (max - min)) + min;
        }
    }
    // 背景画布
    var cvs = document.getElementById('bg');
    var ctx = cvs.getContext('2d');
    var w;
    var h;
    var deltaTime;
    var maxSakuras = 500;
    var lastTime = Date.now();
    var sakuras = [];
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();
    $(window).on('resize', onresize);
    onresize();
    gameloop();



}())