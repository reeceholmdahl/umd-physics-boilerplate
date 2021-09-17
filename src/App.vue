<template>
  <Content></Content>
  <div id="space"></div>
  <Code v-model:code="code"></Code>
</template>

<script>
import Content from './components/Content.vue'
import Code from './components/Code.vue'

export default {
  name: 'App',
  data() {
    return {
      width: 360,
      height: 360,
      code: '',
    }
  },
  components: {
    Content,
    Code
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #3d3d3d;
  height: 100vh;
}

#space {
  display: block;
  width: 100%;
  height: 40px;
}
</style>
