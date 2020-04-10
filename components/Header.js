import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  inGameTips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30
  }
})

export default class Header extends React.PureComponent {
  state = {
    timer: 0
  }
  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ timer: (this.state.timer + 1) })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render () {
    const { bombCount, flagCount } = this.props
    return (
      <View style={styles.inGameTips}>
        <Text>Bombas: {bombCount}</Text>
        <Text>Tempo: {this.state.timer}s</Text>
        <Text>Bandeiras: {flagCount}</Text>
      </View>
    )
  }
}