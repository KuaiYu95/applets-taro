import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './homepage.less'

export default class Homepage extends Component {

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
      <View className='homepage'>
        <Text>homepage !</Text>
      </View>
    )
  }
}
