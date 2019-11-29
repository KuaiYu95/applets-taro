import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Navigator } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import './homepage.less'

export default class Homepage extends Component {

  constructor(props) {
    super(props) 
    this.state = {}
  }

  config = {
    navigationBarBackgroundColor: '#4350FF'
  }

  // 钉钉授权
  ddLogin() {
    dd.showLoading({
      content: '正在授权登录',
      success: () => {
        setTimeout(() => {
          dd.getAuthCode({
            success: result =>{
              const {authCode} = result
              let corpId = getGlobalData('corpId')
              Taro.hideLoading()
              this.login({code: authCode, corpId})
            },
            fail: err =>{
              dd.hideLoading()
              dd.alert({content: JSON.stringify(err)})
            }
          })
        }, 500)
      }
    })
  }
  login({code, corpId}) {
    let {httpUrl} = getGlobalData('httpUrl')
    Taro.request({
      url: httpUrl + '/account/appMp/login',
      method: 'POST',
      data: {code, from: 'ddmp', corpId},
      success: function(res) {
        let {resultCode, data} = res.data
        setGlobalData('tpAccountId', data.id)
        Taro.setStorage({key: 'tpAccountId', data: data.id})
        if (resultCode == 403) {
          Taro.navigateTo({
            url: `/page/login-account/login-account?tpAccountId=${data.id}`
          })
        } else {
          Taro.removeStorage({key: 'code'})
          Taro.setStorage({key: 'token', data: data.token})
          Taro.switchTab({url: '/pages/home/home'})
        }
      },
      fail: function(res) {
        Taro.showModal({content: JSON.stringify(res)})
      },
    })
  }

  // 微信授权
  getPhoneNumber (e) {
    let {iv, encryptedData} = e.detail
    this.getWxCode(iv, encryptedData)
  }
  getWxCode(iv, encryptedData) {
    let self = this
    Taro.login({
      success(res) {
        if (res.code) {
          self.wxLogin(iv, encryptedData, res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  wxLogin(iv, encryptedData, code) {
    console.log({iv, encryptedData, code})
    let httpUrl = getGlobalData('httpUrl')
    Taro.request({
      url: httpUrl + '/account/appMp/login',
      data: {code, from: 'wxmp'},
      success: res => {
        let { resultCode, data, success } = res.data
        console.log(res.data)
        if (success) {
          setGlobalData('tpAccountId', data.id)
          Taro.setStorage({ key: 'tpAccountId', data: data.id })
          Taro.switchTab({url: '../home/home',})
        } else {
          if (resultCode == 402) {
            let {sessionKey} = data
            Taro.request({
              url: httpUrl + '/account/appMp/decodePhone',
              data: {vi: iv, encryptedData, sessionKey},
              method: 'POST',
              success: result => {
                result.success && setGlobalData('phone', result.data.phone)
              },
              fail: err => {
                console.log(err)
              }
            })
          }
          resultCode == 403 && Taro.navigateTo({url: `../login/login?tpAccountId=${data.id}`})
        }
      } 
    })
  }


  render () {
    return (
      <View className='homepage'>
        <View class='header'>
          <Image class='header-img' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/0fef904479c7a13b544fc5dcb1bd9797-638-408.png' />
        </View>
        <View class='contain'>
          <View class='welcome'>欢迎使用移动智慧医院</View>
          <View class='tip'>仅限认证人员使用</View>
          <View class='btns'>
            {process.env.TARO_ENV === 'alipay' && <Button type='primary' onClick={this.ddLogin}>
              <Image class='icon app-icon' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/d91e47bb07425fcc5816342653ce0b17-56-56.png' />
              钉钉登录
            </Button>}
            {process.env.TARO_ENV === 'weapp' && <Button type='primary' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber}>
              <Image class='icon app-icon' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/6d67889c48ab4586e48d6e19a3542362-84-84.png' />
              微信账户登录
            </Button>}
            <Navigator url='/pages/login/login'>
              <Button type='default' class='account'>账号密码登录</Button>
            </Navigator>
          </View>
          <View class='company-support'>©远图互联 技术支持</View>
        </View>
      </View>
    )
  }
}
