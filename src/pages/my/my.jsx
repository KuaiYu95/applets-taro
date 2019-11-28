import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './my.less'

export default class My extends Component {

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
      <View className='my'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
