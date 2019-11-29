import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image, WebView } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import './home.less'

const app = Taro.getApp();
export default class Home extends Component {

  constructor (props) {
    super(props)
    let wxapp = process.env.TARO_ENV === 'weapp'
    let alipay = process.env.TARO_ENV === 'alipay'
    if (wxapp) {
      this.env = 'wx'
    } else if (alipay) {
      this.env = 'dd'
    }
    this.state = { 
      name: '',
      corp: '',
      display: 'none',
      height: 0,
      pirosCode: '',
      view: false,
      src: '',
      shadowDisplay: 'block',
      functions: [],
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { 
    let params = this.$router.params
    params.newUser && this.setState({display: 'block'})
  }

  componentDidMount () { 
    Taro.getStorage({
      key: 'token',
      success: res => {
        console.log('token', res)
        let token = res.data
        let {httpUrl} = app.globalData
        Taro.request({
          url: httpUrl + '/account/appMp/getUserByToken',
          data: {token, from: this.env},
          success: result => {
            let {data, success} = result.data
            if (success) {
              this.setState({name: data.name, corp: data.corporationName})
              Taro.setStorage({key: 'user', data})
            }
          },
          fail: err => {
            console.log(err)
          }
        })
        Taro.request({
          url: httpUrl + `/account/appMp/getPirosCode`,
          headers: {token},
          success: result => {
            let {data, success} = result.data
            console.log(data)
            success && this.setData({pirosCode: data.pirosCode})
          },
          fail: err => {
            console.log(err)
          }
        })
        Taro.request({
          url: httpUrl + '/account/appMp/getServices',
          method: 'POST',
          data: {token},
          success: result => {
            let {data, success} = result.data
            console.log(data)
            success && this.setData({functions: data})
            this.setData({height: Math.ceil(data.length / 4) * 190})
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.log('token-err', err)
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toApp(appUrl) {
    let {pirosCode} = this.state
    this.setState({
      src: `${appUrl}?pirosCode=${pirosCode}`
    }, () => {
      this.setState({view: true})
    })
  }

  shadowDisplay() {
    this.setState({shadowDisplay: 'none'})
  }

  close() {
    this.setState({display: 'none'})
  }

  render () {
    const {name, display, corp, shadowDisplay, src, height, view, functions} = this.state
    return (
      <View className='home'>
        <View>
          <View className='home-tip' style={{display: display}}>
            <Image className='home-tip-bgc' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/02a936c3edd507883f6226cbc103f05c-597-132.png' />
            <View className='tip-inner'>
              点击“
              <Image className='icon' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/1a788b2ef95a51f7afc99d34e90a479a-72-72.png' />
              ”，添加到我的小程序
              <Image className='close icon' onClick={this.close} mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/ac320ae8462d152dff527c189a8a31f7-72-72.png' />
            </View>
          </View>
          <View className='header'>
            <View>欢迎你，{name}</View>
            <View className='vertical-line space'></View>
            <Image className='icon' mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/3fb3ba2397489bfc5700335b830749cc-72-72.png' />
            <View>{corp}</View>
          </View>
          <View className='contain' style={{height: `${height}rpx`}}>
            {functions.map(item => {
              return <View className='function' onClick={() => this.toApp(item.appUrl)}>
                <Image className='img' mode='scaleToFill' src={item.icon} />
                <View className='text'>{item.name}</View>
              </View>
            })}
          </View>
          {view && <WebView src={src} />}
          <View className='shadow' style={{display: shadowDisplay}}>
            <View className='ad'>
              <Image mode='scaleToFill' src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/93c5363e747f726e511287ed8fe82fcf-846-564.png' />
              <View className='first-tip'>
                <View className='first-tip-name'>欢迎您，<Text className='blue'>{name}</Text></View>
                <View className='first-tip-welcome'>感谢您使用智慧医院产品，我是您的移动工作平台，可随时随地为您提供服务。</View>
                <View className='first-tip-add'>为方便后续使用，<Text className='blue'>请添加到“我的小程序”~</Text></View>
                <Button className='first-tip-btn' size='default' type='primary' onClick={this.shadowDisplay}>我知道了</Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
