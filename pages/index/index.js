//index.js
//获取应用实例
const app = getApp()
let words = require("../../words/index")
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    words: words,
    wordLists: [],
    num: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(words)
    console.log(Object.keys(words))
    this.setData({
      wordLists: Object.keys(words)
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    let _this = this;
    innerAudioContext.onEnded((e) => {
      _this.setData({
        num: ""
      })
    })
  },
  audioPlay: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
    let url = e.target.dataset.url
    innerAudioContext.src = "/assets/videos/" +url;
    innerAudioContext.play();
  }
})