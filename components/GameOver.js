import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Button from './Button';

const styles = StyleSheet.create({
  titlte: {
    fontSize: 28,
    textAlign: 'center'
  }
})

export default class GameOver extends React.PureComponent {
  render() {
    return (
      <View>
        <Text style={styles.titlte}>Game Over :(</Text>
        <Button text='Novo jogo' onPress={this.props.onPress} />
      </View>
    )
  }
}