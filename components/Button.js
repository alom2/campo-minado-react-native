import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'teal',
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 5
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
})

export default class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonTxt}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}