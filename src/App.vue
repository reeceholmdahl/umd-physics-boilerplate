<template>
  <div id="container">

    <Content
      v-model:object="object"
      v-model:objX="objX"
      v-model:objY="objY"
      :stageWidth="stageWidth"
      @reset="reset" />

    <div id="code-section">

      <Control
        @runCode="runCode"
        @clearCode="clearCode"
        @reset="reset"
        @focus="focusEditor" />

      <Code
        v-model:code="code"
        @focus="focusEditor" />

    </div>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Control from './components/Control.vue'
import Code from './components/Code.vue'

export default {
  name: 'App',
  data() {
    return {
      code: '',
      object: {},
      startX: 3,
      startY: 1,
      objX: 0,
      objY: 0,
      stageWidth: 50, // in meters
      interval: null,
      timeout: null,
    }
  },
  components: {
    Content,
    Control,
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
      clearInterval(this.interval);
      this.code = '';
      // console.log('clear code!');
    },

    reset() {
      this.object.reset();
      this.objX = this.startX;
      this.objY = this.startY;
      // console.log('resetting!')
    },

    focusEditor() {
      document.getElementById('code-editor').children[1].children[0].focus();
      // console.log('focusing!')
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
