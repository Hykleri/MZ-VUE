<template>
  <div class="mz-city">
    <MzHeader title="当前城市-">{{ filterCityData }}</MzHeader>

    <div class="lv-indexlist">
      <ul class="lv-indexlist__content" id="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail">
                <div class="city-item-text">上海</div>
              </li>
              <li class="city-item-detail">
                <div class="city-item-text">天津</div>
              </li>
            </ul>
          </div>
        </div>
        <li class="lv-indexsection"
          v-for="(item, index) in filterCityData"
          :key="index"
          :id="item.py"
          >
          <p class="lv-indexsection__index">{{ item.py }}</p>
          <ul>
            <li
              v-for="city in item.list"
              :key="city.cityId"
              >
              {{ city.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li
            v-for="(item, index) in filterLetters"
            :key="index"
            @click="hh(item)"
            >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MzHeader from '../../components/MzHeader/Index';
import axios from 'axios';

export default {
  components: {
    MzHeader
  },

  data () {
    return {
      // 城市数据列表
      cityData: []
    }
  },

  computed: {
    // 处理之后的城市数据
    filterCityData () {
      let hash = {};
      let i = 0;
      let res = [];

      this.cityData.forEach(item => {
        // 1.得到当前城市的首字母
        let firstLetter = item.pinyin.substr(0, 1).toUpperCase();
        // 2. 判断当前城市的 首字母是循环过程中第一次出现，还是多次出现。
        if (hash[firstLetter]) {
          // 存在
          let index = hash[firstLetter] - 1;
          res[index].list.push(item);
        } else {
          // 不存在
          hash[firstLetter] = ++i;
          let obj = {};
          obj.py = firstLetter;
          obj.list = [item];
          res.push(obj);
        }
      })

      let temp = res.sort((a, b) => {
        return a.py.charCodeAt() - b.py.charCodeAt();
      })

      return temp;
    },

    // 右侧显示的字母的数据
    filterLetters () {
      return this.filterCityData.map(item => {
        return item.py;
      })
    }
  },

  methods: {
    // 获取城市列表数据
    getCityData () {
      axios.get('./json/city.json').then(response => {
        let res = response.data;
        if (res.status === 0) {
          this.cityData = res.data.cities;
        } else {
          alert(res.msg);
        }
      })
    },

    // 右侧字母导航
    hh (py) {
      // 1. 得到左侧距离顶部的距离。
      let el = document.getElementById(py);
      console.log(el.offsetTop);
      // 2. 操作滚动条进行滚动
      document.getElementById('lv-indexlist__content').scrollTop = el.offsetTop;
    }
  },

  created () {
    this.getCityData();
  }
}
</script>

<style lang="less">
@import url('./index.less');
</style>
