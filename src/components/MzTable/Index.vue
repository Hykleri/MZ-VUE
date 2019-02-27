<template>
  <div class="tabs-bar-wrapper">
    <div class="tabs-bar">
      <ul class="tabs-nav">
        <li style="width: 50%;" :class="{'active': filmType === 'MzHot'}" @click="fn('MzHot')">
          <span>正在热映</span>
        </li>
        <li style="width: 50%;" :class="{'active': filmType === 'MzSoon'}" @click="fn('MzSoon')">
          <span>即将上映</span>
        </li>
        <div class="tab-ink-bar-wrapper"
        :style="[
        {transform: filmType === 'MzHot' ? 'translate3d(0%, 0px, 0px)' : 'translate3d(100%, 0px, 0px)'},
        {width: '50%'}
        ]">
          <span class="tab-ink-bar" style="width: 56px;"></span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState([
      'filmType'
    ])
  },

  methods: {
    ...mapMutations([
      'chgFilmType'
    ]),

    fn (nameId) {
      // console.log('111');
      this.chgFilmType(nameId);
      this.$router.replace('/films/' + nameId);
    }
  }
}
</script>

<style lang="less">
@import url('./index.less');
</style>
