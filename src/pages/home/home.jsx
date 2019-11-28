import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './home.less'

export default class Home extends Component {

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
      <View className='home'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
