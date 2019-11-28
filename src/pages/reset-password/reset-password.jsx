import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './reset-password.less'

export default class ResetPassword extends Component {

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
      <View className='reset-password'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
