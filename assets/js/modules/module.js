import SimplexNoise from "simplex-noise";

import * as P5 from "p5/lib/p5.min"

function randNumber(min, max) {
    return (Math.random() * (max - min) + min);
}

function constrain(x, min, max) {
    return x < min ? min : x > max ? max : x;
}

export function p5training() {
    //3D Waves with WEBGL
    /*let cols, rows;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scl = 250;
    let w = width * 4.4;
    let h = height * 6.4;

    let flying = 0;

    let terrain = [];

    let s = (sk) => {

        sk.setup = () => {
            sk.createCanvas(width, height, sk.WEBGL).parent("main");

            cols = w / scl;
            rows = h / scl;

            for (let x = 0; x < cols; x++) {
                terrain[x] = [];

                for (let y = 0; y < rows; y++) {
                    terrain[x][y] = 0;
                }
            }
        };

        sk.mousePressed = () => {

        };


        sk.draw = () => {
            flying -= 0.01;
            let yoff = -flying;

            for (let y = 0; y < rows; y++) {
                let xoff = flying;

                for (let x = 0; x < cols; x++) {
                    terrain[x][y] = sk.map(sk.noise(xoff, yoff), 0, 1, -360, 360);
                    xoff += 0.1;
                }

                yoff += 0.1;
            }

            sk.background(0, 0);
            sk.translate(0, 50, -50);
            sk.rotateX(sk.PI / 3);
            sk.noStroke();
            let color = 120;

            sk.translate(-w / 2, -h / 2);

            for (let y = 0; y < rows; y++) {
                color += y;

                sk.fill(color);

                sk.beginShape(sk.TRIANGLE_STRIP);

                for (let x = 0; x < cols; x++) {
                    sk.vertex(x * scl, y * scl, terrain[x][y]);
                    sk.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
                }

                sk.endShape();
            }
        };
    };*/

    //Bounding letters

    let font;
    let allPoints = [];
    let mouseX;
    let mouseY;
    let p5 = P5;
    let width, height;
    let canvas;
    let figureRect;
    let bounding;

    class Point {
        constructor(x, y, r, c, p) {

            this.pos = p.createVector(p.random(width), p.random(height));

            this.target = p.createVector(x, y);

            this.vel = p5.Vector.random2D();

            this.acc = p.createVector();

            this.r = r;
            this.color = c;
            this.p = p;
            this.maxspeed = 10;
            this.maxforce = 0.1;
        }

        behaviors() {
            let arrive = this.arrive(this.target);

            this.applyForce(arrive);
        }

        applyForce(f) {
            this.acc.add(f);
        }

        update() {
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.acc.mult(0);
        }

        show() {
            let p = this.p;

            p.stroke(this.color);
            p.strokeWeight(this.r);
            p.point(this.pos.x, this.pos.y);
        }

        arrive(target) {

            let desired = p5.Vector.sub(target, this.pos);

            let d = desired.mag();

            let speed = this.maxspeed;

            if (d < 100) {
                speed = this.p.map(d, 0, 100, 0, this.maxspeed);
            }

            desired.setMag(speed);

            let steer = p5.Vector.sub(desired, this.vel);

            steer.limit(this.maxforce);

            return steer;
        }
    }

    const s = (p) => {

        p.preload = () => {
            font = p.loadFont("../fonts/FiraCode-Bold.otf");
        };

        p.setup = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas = p.createCanvas(width, height).parent("main");

            figureRect = font.textBounds("BIGDRoP", 0, 200, 192);
            let left = (width - figureRect.w) / 2;

            let points = font.textToPoints("BIGDR  ", left, 200, 192, {sampleFactor: 0.3});
            let pointP = font.textToPoints("      P", left, 200, 192, {sampleFactor: 0.3});
            let pointO = font.textToPoints("     o ", left, 200, 192, {sampleFactor: 0.3}).map(function (obj) {
                return {alpha: obj.alpha, x: obj.x + 7, y: obj.y + 40};
            });

            allPoints = points.concat(pointP).concat(pointO);

            for (let i = 0; i < allPoints.length; i++) {
                let color = [];
                let r = 0;

                if (i < (allPoints.length - pointO.length)) {
                    color = [255, 255, 255];
                    r = 4;
                } else {
                    color = [255, 255, 0];
                    r = 8;
                }

                allPoints[i] = new Point(allPoints[i].x, allPoints[i].y, r, color, p);

            }
        };

        p.mouseMoved = () => {
            mouseX = p.mouseX;
            mouseY = p.mouseY;
        };

        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };

        p.draw = () => {
            p.background(49);

            // p.translate(width/2 - figureRect.w/2, 0);

            for (let i = 0; i < allPoints.length; i++) {
                let v = allPoints[i];
                v.behaviors();
                v.update();
                v.show();
            }
        };
    };

    const lib = new P5(s);
}

export function canvas() {
    /*let a = 10;
    let b = 100;
    let time = 0;

    let simplex = new SimplexNoise();

    let main = document.querySelector(".main");
    // let canvas = document.createElement("canvas");
    let canvas = document.querySelector("canvas");
    // let ctx = canvas.getContext("2d");
    let width;
    let height;
    let count = 7000;
    let mouseX = 0;
    let mouseY = 0;
    let scroll = 0;

    // main.appendChild(canvas);

    let x = 0;
    let y = 0;

    class Walker {
        constructor(x, y, r, color, ctx, width, height, countX, countY) {
            this.x = x || 0;
            this.y = y || 0;
            this.r = r;
            this.color = color || "rgb(68,68,68)";
            this.width = width;
            this.height = height;
            this.ctx = ctx;
            this.step = this.r * 2;
            this.path = [];
            this.allow = true;
            this.particleWidth = width / countX;
            this.particleHeight = height / countY;

            this.render = () => {
                // this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                if (this.allow) {

                    this.walk();
                    this.display();

                    window.requestAnimationFrame(this.render);
                }
            };

            this.render();
        }

        walk() {
            let number = Math.floor(randNumber(0, 100));

            // this.path.push(this.y, this.x);

            if (number > 0 && number <= 25) {
                if (this.y + this.step < this.height) {
                    this.y += this.step;
                    // this.y += Math.sin(this.x) * this.step;
                    // this.x += Math.cos(this.y) * this.step;
                }
            }

            if (number > 25 && number <= 50) {
                if (this.x - this.step >= 0) {
                    this.x -= this.step;
                    // this.x -= Math.cos(this.y) * this.step;
                    // this.y -= Math.sin(this.x) * this.step;
                }

            }

            if (number > 50 && number <= 75) {
                if (this.y - this.step >= 0) {
                    this.y -= this.step;
                    // this.y -= Math.sin(this.x) * this.step;
                    // this.x -= Math.cos(this.y) * this.step;
                }

            }

            if (number > 75 && number <= 100) {
                if (this.x + this.step < this.width) {
                    this.x += this.step;
                    // this.x += Math.sin(this.y) * this.step;
                    // this.y += Math.sin(this.x) * this.step;
                }
            }

        }

        display() {

            // this.ctx.clearRect(this.prevX - this.r - 1, this.prevY - this.r -1, this.step+2, this.step+2);
            this.ctx.lineWidth = 1;
            // this.ctx.strokeStyle = this.color;
            this.ctx.strokeStyle = "rgba(0,0,0, .3)";
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            let check = Math.random();
            if (check <= 0.5) {
                //circle
                this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            } else {
                //rectangle
                this.ctx.rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
            }
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.closePath();
        }

        stop() {
            this.allow = false;
        }

        play() {
            this.allow = true;
            this.render();
        }

        delete() {

        }
    }

    class Equalizer {
        constructor(width, height, ctx) {

        }


    }

    window.addEventListener("resize", function () {
        setWidth(this);
    });

    $(window).on("mousemove", function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    $(window).on("scroll", function() {
        scroll = $(this).scrollTop();
    });

    window.addEventListener("load", function () {
        setWidth(this);

        // Walker
        /!*
         *
         *
         x = canvas.offsetWidth / 2;
         y = canvas.offsetHeight / 2;
         var myWalker;
         for (let i = 0; i < 150; i++) {
             let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

            /!* let x = Math.random() * canvas.width;
             let y = Math.random() * canvas.height;*!/
             let x = canvas.width/2;
             let y = canvas.height/2;

             // myWalker = new Walker(x, y, 10, color, ctx, canvas.width, canvas.height);

             console.log(myWalker);
         }*!/

        //Equalizer
        /!*function draw(){
            ctx.clearRect(0,0,width,height);

            ctx.beginPath();

            for(let i = 0; i < count; i++){
                // ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*55 + 128},${Math.random() * 55 + 200})`;

                // let value2d = simplex.noise3D(width/count * i,  time/100, time) * (0.5 - 0.001) + 0.001;
                let value2d = simplex.noise3D(width/count * i, mouseX/1000, mouseY/1000); /!** (0.5 - 0.001) + 0.001*!/;

                let lineheight = value2d * height;

                ctx.fillRect(width/count * i, height / 2 - (lineheight/2), width/count*2, lineheight);
            }
            ctx.fill();
            ctx.closePath();
        }

        function render(){
            draw();

            time += 0.001;
            window.requestAnimationFrame(render);
        }

        render();*!/

        //??
       /!* function draw(){
            // ctx.clearRect(0,0,width,height);

            ctx.beginPath();

            let value2d = simplex.noise2D(mouseX/100, mouseY/100); /!** (0.5 - 0.001) + 0.001;*!/
            let second2d = simplex.noise2D(mouseY/100, mouseX/100); /!** (0.5 - 0.001) + 0.001;*!/

            let lineheight = value2d * (100-20) + 20;
            console.log(lineheight);

            ctx.fillRect(mouseX, mouseY, second2d, lineheight);

            ctx.fill();
            ctx.closePath();
        }

        function render(){
            draw();

            time += 0.001;
            window.requestAnimationFrame(render);
        }*!/

       //bg fog
        /!*let parts = 1000;
        let size = 25;
        // let x, y;

        ctx.strokeWidth = 1;

        function draw(){
            ctx.clearRect(0,0,width,height);

            for(let i = 0; i < parts; i++){
                let value = constrain(simplex.noise3D(i*time, -i*time, time/100), 0.01, 0.1);
                ctx.fillStyle = `rgba(0,0,0, ${value})`;
                ctx.fillRect(Math.random() * width, Math.random() * height, size, size);
            }
        }

        function render(){
            draw();

            time += 0.01;
            window.requestAnimationFrame(render);
        }*!/


        //triangled plain
    });*/

    function setWidth(window) {
        /*canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;
        width = canvas.width;
        height = canvas.height;*/
    }

    function randNumber(min, max) {
        return (Math.random() * (max - min) + min);
    }

    function constrain(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }

}
