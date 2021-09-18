<template>
  <div id="container">
    <Content v-model:object="object" v-model:objX="objX" v-model:objY="objY" />
    <div id="code-section">
      <Buttons @runCode="runCode" @clearCode="clearCode" @reset="reset" />
      <Code v-model:code="code" />
    </div>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Buttons from './components/Buttons.vue'
import Code from './components/Code.vue'

export default {
  name: 'App',
  data() {
    return {
      code: '',
      object: {},
      objX: 0,
      objY: 0,
      interval: null,
      timeout: null,
    }
  },
  components: {
    Content,
    Buttons,
    Code
  },
  methods: {
    runCode() {

      clearTimeout(this.timeout);
      clearInterval(this.interval);

      const userCode = new Function(this.code +
      `
      const functions = {};
      try {
        functions.integrate = integrate;
      } catch(e) {
        functions.integrate = () => {};
      }

      try {
        functions.setup = setup;
      } catch(e) {
        functions.setup = () => {};
      }

      return functions;
      `);

      const functions = userCode();

      functions.setup(this.object);
      this.interval = setInterval(() => {
        functions.integrate(this.object, 1/30);
      }, 1000 / 30);

      this.timeout = setTimeout(() => {
        clearInterval(this.interval);
      }, 3500);
    },

    clearCode() {
      // console.log('clear code!');
      clearInterval(this.interval);
      this.code = '';
    },

    reset() {
      this.object.reset();
      this.objX = 0;
      this.objY = 0;
    }
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

#app {
  background-color: #3B353B;
  height: 100vh;
}

#container {
  padding: 0;
  padding-top: 3vh;
  padding-bottom: 2vh;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

#code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
