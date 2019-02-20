<template>
  <div>
    <MzBanner></MzBanner>
    <MzTable></MzTable>

    <button @click="goCity">选择城市</button>

    <ul>
      <router-link tag="li" to="/detail/100">刀剑神域</router-link>
      <router-link tag="li" to="/detail/200">约定的梦幻岛</router-link>
      <router-link tag="li" to="/detail/300">五等分的新娘</router-link>
    </ul>
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
  },

  methods: {
    goCity () {
      this.$router.replace('/city');
    }
  }
}
</script>
