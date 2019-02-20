<template>
  <div class="swiper-container mz-banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="item in bannerList"
        :key="item._id">
        <img :src="item.imgUrl" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// 使用axios调用后台的接口。

// 1. 引入它 axios
import axios from 'axios';

// 2. 调用 axios.get('http://localhost:3000/banner/search')
export default {
  data () {
    return {
      // 轮播图数据
      bannerList: [],

      // swiper的实例对象
      mySwiper: null
    }
  },

  methods: {
    initSwiper () {
      // 对某个代码不校验 eslint 的规则
      /* eslint-disable */
      this.mySwiper = new Swiper(".swiper-container", {
        autoplay: {
          disableOnInteraction: false,
          delay: 1000
        },
        loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      });
      /* eslint-enable */
    }
  },

  created () {
    axios.get('http://localhost:3000/banner/search', {
      // parpams 才是 get 的参数
      params: {
        pageSize: 10
      }
    }).then((res) => {
      // !!!! res 不是 后台返回给你的数据，真正后台给你返回的数据在 res.data 上面。
      // console.log(res);
      let data = res.data;
      if (data.code === 0) {
        this.bannerList = data.data;
        // 1. 数据更新之后，对轮播图做个更新

        // 2. 数据更新之后，再做 new Swiper (PS: 数据的更新到页面真实DOM的更新还需要一点点时间)  $nextTick() 这个函数能确保真实dom的更新
        this.$nextTick(() => {
          this.initSwiper();
        })
      } else {
        alert('网络异常，请稍后重试');
      }
    })
  },

  mounted () {}
};
</script>

<style lang="less">
.mz-banner {
  height: 210px;
  img {
    width: 100%;
    height: 100%
  }

  .swiper-pagination-bullet {
    display: inline-block;
    border: 1px solid hsla(0,0%,100%,.8)!important;
    background: hsla(0,0%,100%,0);
    opacity: 1!important;
  }

  // .swiper-pagination {
  //   // width: 5px!important;
  //   // height: 5px!important;
  //   // position: absolute;
  //   // bottom: 10px;
  //   // left: auto!important;
  //   // right: 12px!important;
  // }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
  }
}
</style>
