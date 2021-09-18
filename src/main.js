import { createApp } from 'vue';
import App from './App.vue';
import p5 from 'p5';

let objX = 20;
let objY = 20;

createApp(App)
    .mount('#app');

function resizeCanvas(s) {
    const width = document.getElementById('p5content').offsetWidth - 8;
    const height = document.getElementById('p5content').offsetHeight - 8;
    s.resizeCanvas(width, height)
}

/**
 * @param {p5.p5InstanceExtensions} s 
 */
const sketch = (s) => {

    s.setup = function() {
        
        s.createCanvas();

        resizeCanvas(s);

        App.data().object = function() {
            this.velX = 0;
            this.velY = 0;
            this.accX = 0;
            this.accY = 0;
            this.addX = function(dx) {
                objX += dx;
            };
            this.addY = function(dy) {
                objY += dy;
            };
            this.addVelX = function(dvx) {
                this.velX += dvx;
            };
            this.addVelY = function(dvy) {
                this.velY += dvy;
            };
        };
    }

    s.draw = function() {

        s.clear();
        s.background('#08B2CC');

        // const obj = App.data().object;

        s.circle(objX, objY, 20);
        s.strokeWeight(2);
        s.fill('#3612CC');
        s.stroke('#1d1d1d')
    }

    s.windowResized = function() {
        resizeCanvas(s);
    }
}

window.instance = new p5(sketch);