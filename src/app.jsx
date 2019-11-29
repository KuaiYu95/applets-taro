import Taro, { Component } from '@tarojs/taro'
import Homepage from './pages/homepage/homepage'
// import Home from './pages/home/home'
// import Login from './pages/login/login'
// import Messages from './pages/messages/messages'
// import My from './pages/my/my'
// import Setting from './pages/setting/setting'
// import ResetPassword from './pages/reset-password/reset-password'

import { set as setGlobalData } from './global_data'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/homepage/homepage',
      'pages/home/home',
      'pages/reset-password/reset-password',
      'pages/setting/setting',
      'pages/my/my',
      'pages/login/login',
      'pages/messages/messages',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#2582F2',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/home/home',
          name: '首页',
          icon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/21aad84adcb99f76afc45a5f0b8dc6f7-81-81.png',
          activeIcon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/f15641a4496cf80937ae04f115dc3160-81-81.png'
        },
        {
          pagePath: 'pages/messages/messages',
          name: '消息',
          icon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/14b5c5dc9c00a741d8e24a6cd66b2f4a-81-81.png',
          activeIcon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/99f7388cbc625770a6dfed76e70066a1-81-81.png'
        },
        {
          pagePath: 'pages/my/my',
          name: '我的',
          icon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/8682154b898decb84166300567ecd5a3-81-81.png',
          activeIcon: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/d149bf8b32d3e2158e8e1303d8591231-81-81.png'
        }
      ]
    }
  }

  globalData = {
    corpId: ''
  }

  componentWillMount() {
    let {corpId} = this.$router.params.query
    this.globalData.corpId = corpId
    setGlobalData('corpId', corpId)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Homepage />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
