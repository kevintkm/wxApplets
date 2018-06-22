//logs.js
const util = require('../../utils/util.js')
var app = getApp().globalData
Page({
  data: {
    text: 0,
    width: app.screenWidth
  },
  onShow: function () {
    this.requestData();
  },

  requestData: function () {
    var that = this;
    wx.request({
      url: "https://api.vd.cn/mengdianApp/getPageInfo",
      data: {
        "BaseAppType": "ios",
        "SystemVersion": "10.3.3",
        "_token_": "d69ded09d3d64f63af452476373b2dbd",
        "shop_id": "17002188",
        "spreadChannel": "app store",
        "BaseAppVersion": "4.8.0",
        "channel": "AppBuyerHome",
        "appIdentifier": "com.hs.yjseller",
        "_wid_": "602975945",
        "_sign_": "3FB7FEA9726A3C3FC349B56A8A61FEE9",
        "page": 1,
        "hardware": "iPhone9,1",
        "pageSize": 20
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        that.setData({
          text: res.data.code
        })
      },
      fail: function (res) {
        console.log(res.data)
      },
      complete: function (res) {
      },
    })
  },

  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  }
})
