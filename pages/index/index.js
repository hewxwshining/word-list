//index.js
//获取应用实例
const app = getApp()
let words = require("../../words/index")
const innerAudioContext = wx.createInnerAudioContext()
const ALPHABET_HEIGHT = 20
const ALPHABET_WIDTH = 30
Page({
  data: {
    clientHeight: "",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    words: words,
    listHeight: [],
    num: '',
    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    //shape 部分
    shapeHeight: "",
    shapeOutside: "",
    alphabetBox: {},
    alphabetIndex: 0,
    touch: {},
    toListItem: 'list-item-0'
  },
  onLoad: function () {
    let res = wx.getSystemInfoSync();
    this.setData({
      clientHeight: res.windowHeight,
      scrollTop: 0,
      toListItem: 'list-item-0'
    })
    let _this = this;
    wx.createSelectorQuery().select('#conatainer').boundingClientRect().selectViewport().scrollOffset().exec((res) => {
      _this.setData({
        shapeHeight: res[0].height
      })
    });
    wx.createSelectorQuery().select('#alphabet').boundingClientRect().selectViewport().scrollOffset().exec((res) => {
      let top = res[0].top;
      let bottom = res[0].bottom
      _this.setData({
        shapeOutside: "polygon(" + ALPHABET_WIDTH + "px " + top + "px,0px " + top + "px,0px " + bottom + "px," + ALPHABET_WIDTH + "px " + bottom + "px",
        alphabetBox: {
          top: top,
          bottom: bottom
        }
      })
    });
    this.calculateHeight()
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

    let url = e.currentTarget.dataset.url
    if (url != "") {
      this.setData({
        num: e.currentTarget.dataset.num
      })
      innerAudioContext.src = "/assets/videos/" + url;
      innerAudioContext.play();
    }
  },
  funShape() {
    let _this = this;
    wx.createSelectorQuery().select('#conatainer').boundingClientRect().selectViewport().scrollOffset().exec((res) => {
      let scrollTop = -res[0].top;
      let {
        top,
        bottom
      } = _this.data.alphabetBox;
      var shapeOutside = "polygon(" + ALPHABET_WIDTH + "px " + (top + scrollTop) + "px,0px " + (top + scrollTop) + "px,0px " + (bottom + scrollTop) + "px," + ALPHABET_WIDTH + "px " + (bottom + scrollTop) + "px";
      _this.setData({
        shapeOutside: shapeOutside,
      })
    })
  },
  onShortcutTouchStart(e) {
    let alphabetIndex = e.target.dataset.index;
    let firstTouch = e.touches[0];
    this.setData({
      alphabetIndex: alphabetIndex,
      touch: {
        y1: firstTouch.pageY,
        alphabetIndex: alphabetIndex,
      },
      toListItem: 'list-item-' + alphabetIndex
    })

  },
  onShortcutTouchMove(e) {
    let firstTouch = e.touches[0];
    let touch = this.data.touch;
    touch.y2 = firstTouch.pageY;
    let delta = (touch.y2 - touch.y1) / ALPHABET_HEIGHT | 0
    let alphabetIndex = parseInt(touch.alphabetIndex) + delta;
    this.setData({
      alphabetIndex: alphabetIndex,
      touch: touch,
      toListItem: 'list-item-' + alphabetIndex
    })
  },
  scrollTo() {

  },
  scroll(e) {
    this.funShape();
    let scrolltop = e.detail.scrollTop;
    let listHeight = this.data.listHeight;
    // 当滚动到顶部，newY>0
    if (scrolltop < 20) {
      this.setData({
        alphabetIndex: 0
      })
      return
    }

    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (scrolltop >= height1 && scrolltop < height2) {
        // this.diff = height2 + scrolltop
        this.setData({
          alphabetIndex: i
        })
        return
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    this.setData({
      alphabetIndex: listHeight.length - 1
    })
  },
  //计算每个字母区域的高度
  calculateHeight() {
    let listHeight = []
    let _this = this;
    wx.createSelectorQuery().selectAll('.list-item').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        listHeight.push(rect.top)
      })
      _this.setData({
        listHeight: listHeight
      })
    }).exec()
  }
})