import MD5 from './md5.js';
const BASE_URL = 'https://api.vd.cn/';
// const postData = {"BaseAppType": "ios", "SystemVersion": "10.3.3", "_token_": "993473de88ef43a9b0f632bbfe9e4b80", "shop_id": "124392611", "spreadChannel": "app store", "BaseAppVersion": "4.10.0", "page_num": 1, "from_where": "1", "appIdentifier": "com.hs.yjseller", "_wid_": "604749691", "wid": "604749691", "order_group_type": 0, "page_size": 10, "hardware": "iPhone7,1", "order_biz_type": -1 };

const baseParam = () => {
  let system = wx.getSystemInfoSync();
  return {
    "BaseAppType": "ios",
    "SystemVersion": "10.3.3",
    "_token_": "993473de88ef43a9b0f632bbfe9e4b80",
    "shop_id": "124392611",
    "spreadChannel": "app store",
    "BaseAppVersion": "4.10.0",
    "page_num": 1,
    "from_where": "1",
    "appIdentifier": "com.hs.yjseller",
    "_wid_": "604749691",
    "wid": "604749691",
    "page_size": 10,
    "hardware": "iPhone7,1",
    "order_biz_type": -1
  };
}

function getServices(relativeUrl) {
  return BASE_URL + relativeUrl;
}

const signData = (data) => {
  let json = JSON.stringify(data);
  let sourceString = json + "yunjie2514572541463841s1a4d";
  return MD5.hex_md5(sourceString).toUpperCase();
}

function request(obj) {
  let data = baseParam();
  console.log(data);
  for (let key in obj.data) {
    console.log(key)
    if (obj.data.hasOwnProperty(key)) {
      data[key] = obj.data[key];
    }
  }
  data['_sign_'] = signData(data);
  wx.request({
    url: getServices(obj.url),
    data: data,
    method: "POST",
    success: function (response) {
      obj.success(response);
    },
    fail: function (error) {
      console.log('error = ' + error);
      if (obj.hasOwnProperty('fail')) {
        obj.fail(error);
      }
    },
    complete: function () {
      if (obj.hasOwnProperty('complete')) {
        obj.complete();
      }
    }
  })

}

export default request;