import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './login.less'

export default class Login extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='login'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
