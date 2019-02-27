<template>
  <div class="film-list-content" style="margin-bottom: 0.5rem;">
    <div class="nowPlayingList-wrap">
      <ul class="nowPlayingList">
        <li class="nowPlayingFilm-item"
        v-for="film in filmList"
        :key="film.filmId">
          <a href="#" class="nowPlayingFilm-wrap">
            <!-- 图片 -->
            <div class="lazy-img nowPlayingFilm-img" style="width: 66px; height: 94px; background: rgb(249, 249, 249); float: left;">
              <!-- <div class="padding" style="width: 66px; height: 94px; background: rgb(249, 249, 249);">
                <img src="@/assets/avatar.png" alt="" width="64px">
              </div> -->
              <div class="lazy-img-wrap" style="width: 66px; height: 94px; background: rgb(249, 249, 249); opacity: 1; display: block;">
                <img :src="film.poster" alt="" class="target-img">
              </div>
            </div>
            <!-- 简介 -->
            <div class="nowPlayingFilm-info" style="float: left;">
              <div class="nowPlayingFilm-name info-col">
                <span class="name">{{ film.name}}</span>
                <span class="item">{{ film.filmType && film.filmType.name }}</span>
              </div>
              <!-- <div class="nowPlayingFilm-grade info-col" style="visibility: visible;">
                <span class="label">观众评分 </span>
                <span class="grade">{{ item.grade }}</span>
              </div> -->
              <div class="nowPlayingFilm-actors info-col">
                <span class="label">主演：{{ film.actors ? film.actors.map(item => item.name).join(' ') : '暂无主演' }}</span>
              </div>
              <div class="nowPlayingFilm-detail info-col">
                <span class="label">{{ film.nation }} | {{ film.runtime }}分钟</span>
              </div>
            </div>
            <!-- 购票 -->
            <div class="nowPlayingFilm-buy" style="float: right;">
              预购
            </div>
          </a>
        </li>
      </ul>
    </div>
    <p v-if="pageNum >= pages" class="lz-foot">我是有底线的，别拉拉。</p>
    <p v-else @click="loadMore" class="lz-footBin">点击加载更多</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      filmList: [],
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },

  computed: {
    // pages 一共多少页
    pages () {
      return Math.ceil(this.total / this.pageSize);
    }
  },

  methods: {
    getFilmData () {
      axios.get('/api/gateway', {
        params: {
          cityId: 440300,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          type: 1,
          k: 1623602
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"1551057590167666933301435"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(response => {
        let res = response.data;
        // console.log(res);
        if (res.status === 0) {
          this.filmList = this.filmList.concat(res.data.films);
          this.total = res.data.total;
        }
      })
    },

    loadMore () {
      this.pageNum++;
      this.getFilmData();
    }
  },
  created () {
    this.getFilmData();
  }
  // created () {
  //   axios.get('http://localhost:3000/films/search', {
  //     params: {
  //       pageSize: 10
  //     }
  //   }).then((res) => {
  //     let data = res.data;
  //     if (data.code === 0) {
  //       this.hotList = data.data;
  //     } else {
  //       alert('网络异常，请稍后重试');
  //     }
  //   })
  // },

  // mounted () {}
};
</script>

<style lang="less">
@import url('./index.less');
</style>
