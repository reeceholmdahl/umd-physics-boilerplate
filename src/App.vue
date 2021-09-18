<template>
  <!-- <div id="space"></div> -->
  <div id="container">
    <Content />
    <div id="code-section">
      <Buttons @runCode="runCode" @clearCode="clearCode" />
      <Code v-model:code="code" />
    </div>
  </div>
  <!-- <div id="space"></div> -->
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
      object: null,
    }
  },
  components: {
    Content,
    Buttons,
    Code
  },
  methods: {
    runCode() {
      console.log('run code!');
    },
    clearCode() {
      console.log('clear code!');
    },
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
