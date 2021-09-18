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
      width: 0,
      height: 0
    }
  },
  props: [
    'object',
    'objX',
    'objY',
    'stageWidth'
  ],
  emits: [
    'update:object',
    'update:objX',
    'update:objY',
    'reset'
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

            object.addY = function(dy) {
              ref.$emit('update:objY', ref.objY + dy);
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
            
            this.$emit('update:object', object);
            this.$emit('reset');
        }

        s.draw = () => {

            s.clear();
            s.background('#08B2CC');

            s.circle(this.objX * this.width / this.stageWidth, this.height - (this.objY * this.width / this.stageWidth), 2 * this.width / this.stageWidth);
            s.strokeWeight(0.2 * this.width / this.stageWidth);
            s.fill('#3612CC');
            s.stroke('#1d1d1d')
        }

        s.windowResized = () => {
            resizeCanvas(s);
        }
    }

    const resizeCanvas = (s) => {
      this.width = document.getElementById('p5content').offsetWidth - 8;
      this.height = document.getElementById('p5content').offsetHeight - 8;
      s.resizeCanvas(this.width, this.height)
    }

    this.instance = new p5(sketch);
  }
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
