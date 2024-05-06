<script lang="ts" setup>
import TableExample from './components/TableExample.vue'
</script>

<script lang="ts">
export default {
  name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
}
</script>

<template>
  <div class="col bg-fill1 px-5 py-4 pb-0">
    <TableExample />
  </div>
</template>

<style lang="less" scoped>
  // .container {
  //   background-color: var(--color-fill-2);
  //   padding: 16px 20px;
  //   padding-bottom: 0;
  //   display: flex;
  // }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
</style>
