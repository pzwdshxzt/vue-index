// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = () => {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }
  return {
    articles: articles
  }
}

const transferInfo = (request) => {
  let requestJson = JSON.parse(request.body).form
  let retMsg = {}
  retMsg = {
    ret_msg: '交易失败',
    ret_code: '0001'
  }
  if (requestJson.account === '123' && requestJson.name === '123') {
    retMsg = {
      ret_msg: '交易成功',
      ret_code: '0000'
    }
  }
  return {
    data: retMsg
  }
}

const accountList = () => {
  return {
    payAccounts: [
      {
        labelName: '62****7833',
        value: '6212123443657833'
      },
      {
        labelName: '62****4319',
        value: '6265773443654319'
      },
      {
        labelName: '62****1222',
        value: '6265773443651222'
      },
      {
        labelName: '62****3321',
        value: '6265773443653321'
      }
    ]
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/base64.do', 'post', produceNewsData)
Mock.mock('/mock/transfer.do', 'post', transferInfo)
Mock.mock('/mock/accountList.do', 'get', accountList)
