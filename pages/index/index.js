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
    num: ''
  },
  onLoad: function () {
    this.setData({
      wordLists: Object.keys(words)
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
    console.log(e)
    this.setData({
      num: e.currentTarget.dataset.num
    })
    let url = e.currentTarget.dataset.url
    innerAudioContext.src = "/assets/videos/" +url;
    innerAudioContext.play();
  }
})