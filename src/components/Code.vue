<template>
    <prism-editor
        id="code-editor"
        v-model="m_code"
        @input="updateCode(m_code)"
        @click="$emit('focus')"
        :highlight="highlighter"
        language="js"
        emit-events="true"
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
      'update:code',
      'focus'
  ],
  watch: {
      'code': function(newCode) {
          this.m_code = newCode;
      },

      'm_code': function(newCode) {
          this.updateCode(newCode);
      }
  },
  methods: {
      updateCode(code) {
          this.$emit('update:code', code);
      },

      test(e) {
          console.log(e);
      },

      highlighter(code) {
          return highlight(code, languages.js);
      }
  }
}
</script>

<style>
/* required class */
  #code-editor {
    width: 50vw;
    height: 35vh;
    background: #292A2E;
    color: #ccc;
 
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    border: 4px solid #1d1d1d;
  }
 
  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>