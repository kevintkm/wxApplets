//index.js
//获取应用实例
const app = getApp()
var animation = wx.createAnimation({
  duration: 300,
  timingFunction: 'linear'
})

Page({
  data: {
    materialList: null,
    selectIndex:0,
    screenWidth: app.globalData.systemInfo.screenWidth,
    animations:{},
    scroll:"index0",
    scrollLeft:0
  },
  onShow: function () {
    //获取不到屏幕的宽度，NAN
    // that.itemWidth = that.screenWidth / 6.5 
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res)
    //     that.itemWidth = res.screenWidth / 6.5 
    //   },
    // })
  
  },

  menuClick:function(event){
    var that =this
    let itemWidth = app.globalData.systemInfo.screenWidth / 6.5
    animation.translateX((event.currentTarget.dataset.index) * itemWidth).step()

    that.setData({
      selectIndex: event.currentTarget.dataset.index,
      animations:animation.export(),
      scroll:event.currentTarget.id,
      scrollLeft: event.currentTarget.offsetLeft + itemWidth / 2 - app.globalData.systemInfo.screenWidth/2
    })

  },

  requestData: function () {
    var that = this;
    app.request({
      url:'mengdianApp/getPageInfo',
      data: {
        "pageSize": 20,
        "channel": "AppBuyerHome",
        "_sign_": "95BB77B1CB9A39DBF32AF8EC4C65EFE5",
        "page": 1
      },
      success:function(response){
        console.log(response)
        that.setData({
          materialList: response.data.data
        })
      }
    })
  },

  onLoad: function () {
    console.log('screenWidth=' + this.screenWidth)
    this.requestData();
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  }
})