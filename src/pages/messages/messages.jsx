import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './messages.less'

export default class Messages extends Component {

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
      <View className='messages'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
