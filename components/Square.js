import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons'


const styles = StyleSheet.create({
  active: {
    backgroundColor: '#ececec'
  },
  default: {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class Square extends React.PureComponent {
  renderValue = () => {
    const { value, active } = this.props
    if (!active) {
      return null
    }
    if (value === 'flag') {
      return <FontAwesomeIcon icon={faFlag} />
    }
    if (value === 'bomb') {
      return <FontAwesomeIcon icon={faBomb} />
    }
    return <Text>{value}</Text>
  }

  render () {
    const { active, style, value, onPress } = this.props
    const squareStyle = [
      style,
      styles.default,
      active && styles.active
    ]
    return (
      <TouchableOpacity disabled={active} onPress={onPress}>
        <View style={squareStyle}>
          { this.renderValue() }
        </View>
      </TouchableOpacity>
    )
  }
}