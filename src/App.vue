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
    }
  },
  components: {
    Content,
    Buttons,
    Code
  },
  methods: {
    runCode() {
      eval(this.code);

      this.interval = setInterval(() => {
        window.integrate(this.object, 1/30);
      }, 1000 / 30);
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
