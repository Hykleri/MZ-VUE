import Mock from 'mockjs';

// 使用 Mock.mock 来拦截请求
/**
 * 第一个参数，url地址 (注意：url地址写全部的url，要么写正则匹配)
 * 第二个参数，是数据模板，是最终返回给前端的内容。
 */
Mock.mock(/banner\/search/, {
  'code|1': [0, -1],
  'msg|1': ['ok', '网络异常，请稍后重试'],
  'data|10-20': [
    {
      '_id|1-100': 100,
      imgUrl: Mock.Random.image('750x420')
    }
  ]
})
