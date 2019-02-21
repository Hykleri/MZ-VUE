<template>
  <div class="film-list">
    <MzBanner></MzBanner>
    <MzTable></MzTable>

    <router-link tag='div' to='/city' @click="goCity" class="city-fixed">
      <span>{{ curCityName }}</span>
      <i class="iconfont icon-xiala" style="font-size: 10px;"></i>
    </router-link>

    <ul>
      <router-link tag="li" to="/detail/100">刀剑神域</router-link>
      <router-link tag="li" to="/detail/200">约定的梦幻岛</router-link>
      <router-link tag="li" to="/detail/300">五等分的新娘</router-link>
    </ul>
  </div>
</template>

<script>
import MzBanner from '@/components/MzBanner/Index';
import MzTable from '@/components/MzTable/Index';

export default {
  // 局部注册组件
  components: {
    MzBanner,
    MzTable
  },

  computed: {
    curCityName () {
      return this.$store.state.curCityName;
    }
  },

  methods: {
    goCity () {
      this.$router.push('/city');
    }
  }
}
</script>

<style lang="less">
.film-list {
  // position: relative;

  .city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0,0,0,.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;
    // box-sizing: border-box;
    // border: 0;
  }
}
</style>
