<template>
    <button id="runCode" @click="runCode">Run</button>
    <prism-editor
        id="code-editor"
        v-model="m_code"
        @input="onEdit(m_code)"
        @click="focus"
        :highlight="highlighter"
        line-numbers
    ></prism-editor>

</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-funky.css'

export default {
  name: 'Code',
  components: {
      PrismEditor
  },
  data() {
      return {
          m_code: '',
      }
  },
  props: [
      'code'
  ],
  emits: [
      'update:code'
  ],
  methods: {
      onEdit(code) {
          this.$emit('update:code', code);
      },

      highlighter(code) {
          return highlight(code, languages.js);
      },

      focus() {
          document.getElementById('code-editor').children[1].children[0].focus();
      },

      runCode() {
          try {
              eval(this.code);
              window.test = () => { eval(this.code) };
          } catch(e) {
              console.log(e);
          }
      }
  }
}
</script>

<style>
/* required class */
  #code-editor {
    width: 480px;
    height: 240px;
    background: #2d2d2d;
    color: #ccc;
 
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
 
  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>