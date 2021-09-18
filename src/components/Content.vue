<template>
  <div id="p5content">
    <main id="p5"></main>
  </div>
</template>

<script>
export default {
  name: 'Content',
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
