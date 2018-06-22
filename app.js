import request from './pages/common/server.js'

//app.js
App({
  request,
  onLaunch: function () {
    // 展示本地存储能力
    this.getSystemInfo();
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        // this.globalData.screenWidth = res.windowWidth
        console.log(res.windowWidth)
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

getSystemInfo:function(){
  let that = this;
  wx.getSystemInfo({
    success: function(res) {
      that.globalData.systemInfo = res;
    },
  })
},

  //全局共享数据 app.globalData.userInfo访问
  globalData: {
    userInfo: null,
    systemInfo: null
  }
})