import { createApp } from 'vue';
import App from './App.vue';
import p5 from 'p5';

createApp(App)
    .mount('#app');

const State = {
    player: null,
}
export default State;

/**
 * 
 * @param {p5.p5InstanceExtensions} s 
 */
const sketch = (s) => {

    s.setup = function() {
        const { width, height } = App.data();
        
        s.createCanvas(width, height);

        State.player = {
            x: 100,
            y: 100,
            size: 50,
        }
    }

    s.draw = function() {

        s.clear();
        s.background(102, 0, 204);

        window.player = State.player;

        s.circle(State.player.x, State.player.y, State.player.size);
        s.fill(204, 102, 0);
    }
}

window.instance = new p5(sketch);