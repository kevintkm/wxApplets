// pages/order/orderList.js
const app = getApp()
const orderType = [
  {
    title: '全部',
  }, {
    title: '待付款',
    id: "pending_pay"
  }, {
    title: '待发货',
    id: "pending_delivery"
  }, {
    title: '待收货',
    id: "pending_receipt"
  }, {
    title: '待评价',
    id: "pending_evaluate"
  }
]

var animation = wx.createAnimation({
  duration: 300,
  timingFunction: 'linear'
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.systemInfo.screenWidth,
    selectItem: 0
  },

  itemClick: function (event) {

    var that = this;
    let itemWidth = app.globalData.systemInfo.screenWidth / 5;
    that.requestData(event.currentTarget.dataset.index);
    console.log(event.currentTarget.dataset.index);
    animation.translateX((event.currentTarget.dataset.index) * itemWidth).step()
    that.setData({
      selectItem: event.currentTarget.dataset.index,
      animationData: animation.export()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.request({
    //   url: 'order/list',
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       // categoryList: res.data.data
    //       // sub: res.data.data,
    //       // materialList: res.data.data[0].materialList
    //     });
    //   }
    // })
    this.requestData(0);
  },

  requestData: function (type) {
    const that = this
    app.request({
      url: 'order/list',
      data: {
        'status': orderType[type].id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderType: orderType,
          orderList: res.data.data.datalist
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})