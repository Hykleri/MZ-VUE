<template>
  <div>
    <MzBanner></MzBanner>
    <MzTable></MzTable>
  </div>
</template>

<script>
import MzBanner from '../components/MzBanner/Index';
import MzTable from '../components/MzTable/Index';

export default {
  // 局部注册组件
  components: {
    MzBanner,
    MzTable
  }
}
</script>
