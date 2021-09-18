<template>
  <div id="p5content">
    <main id="p5"></main>
  </div>
</template>

<script>
import p5 from 'p5';

export default {
  name: 'Content',
  data() {
    return {
      instance: null,
    }
  },
  props: [
    'object',
    'objX',
    'objY',
  ],
  emits: [
    'update:object',
    'update:objX',
    'update:objY'
  ],
  mounted() {

    const ref = this;

    /**
     * @param {p5.p5InstanceExtensions} s 
     */
    const sketch = (s) => {

        s.setup = () => {
            
            s.createCanvas();

            resizeCanvas(s);

            // eslint-disable-next-line no-unused-vars
            const object = {
              velX: 0,
              velY: 0,
              accX: 0,
              accY: 0,
            };

            object.addX = function(dx) {
              ref.$emit('update:objX', ref.objX + dx);
            }

            object.addY = function(dx) {
              ref.$emit('update:objX', ref.objX + dx);
            }

            object.addVelX = function(dvx) {
              this.velX += dvx;
            }

            object.addVelY = function(dvy) {
              this.velY += dvy;
            }

            object.reset = function() {
              this.velX = 0;
              this.velY = 0;
              this.accX = 0;
              this.accY = 0;
            }
            
            ref.$emit('update:object', object);
        }

        s.draw = () => {

            s.clear();
            s.background('#08B2CC');

            s.circle(this.objX, this.objY, 20);
            s.strokeWeight(2);
            s.fill('#3612CC');
            s.stroke('#1d1d1d')
        }

        s.windowResized = () => {
            resizeCanvas(s);
        }
    }

    this.instance = new p5(sketch);
  }
}

function resizeCanvas(s) {
    const width = document.getElementById('p5content').offsetWidth - 8;
    const height = document.getElementById('p5content').offsetHeight - 8;
    s.resizeCanvas(width, height)
}
</script>

<style scoped>

#p5content {
  width: calc((50vh - 10px) * 16 / 9);
  height: calc(50vh - 10px);
  /* background-color: #08B2CC; */
  border: 4px solid #1d1d1d
}
</style>
