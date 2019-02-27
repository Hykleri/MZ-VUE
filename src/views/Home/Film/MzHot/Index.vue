<template>
  <div class="film-list-content" style="margin-bottom: 0.5rem;">
    <div class="nowPlayingList-wrap">
      <ul class="nowPlayingList">
        <li class="nowPlayingFilm-item"
        v-for="item in hotList"
        :key="item._id">
          <a href="#" class="nowPlayingFilm-wrap">
            <!-- 图片 -->
            <div class="lazy-img nowPlayingFilm-img" style="width: 66px; height: 94px; background: rgb(249, 249, 249); float: left;">
              <!-- <div class="padding" style="width: 66px; height: 94px; background: rgb(249, 249, 249);">
                <img src="@/assets/avatar.png" alt="" width="64px">
              </div> -->
              <div class="lazy-img-wrap" style="width: 66px; height: 94px; background: rgb(249, 249, 249); opacity: 1; display: block;">
                <img :src="item.imgUrl" alt="" class="target-img">
              </div>
            </div>
            <!-- 简介 -->
            <div class="nowPlayingFilm-info" style="float: left;">
              <div class="nowPlayingFilm-name info-col">
                <span class="name">{{ item.name}}</span>
                <span class="item">2D</span>
              </div>
              <div class="nowPlayingFilm-grade info-col" style="visibility: visible;">
                <span class="label">观众评分 </span>
                <span class="grade">{{ item.grade }}</span>
              </div>
              <div class="nowPlayingFilm-actors info-col">
                <span class="label">主演：{{ item.actor }}</span>
              </div>
              <div class="nowPlayingFilm-detail info-col">
                <span class="label">{{ item.country }}</span>
              </div>
            </div>
            <!-- 购票 -->
            <div class="nowPlayingFilm-buy" style="float: right;">
              购票
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      hotList: []
    }
  },

  created () {
    axios.get('http://localhost:3000/films/search', {
      params: {
        pageSize: 10
      }
    }).then((res) => {
      let data = res.data;
      if (data.code === 0) {
        this.hotList = data.data;
      } else {
        alert('网络异常，请稍后重试');
      }
    })
  },

  mounted () {}
};
</script>

<style lang="less">
@import url('./index.less');
</style>
