/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import Square from './components/Square'
import Header from './components/Header'
import NewGame from './components/NewGame'
import GameOver from './components/GameOver'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  game: {
    borderWidth: 1,
    borderColor: '#aaa',
  }
})

let initialState = {}

export default class App extends React.PureComponent {
  state = {
    game: [],
    flagCount: 6,
    bombCount: 6,
    status: 'newGame',
  }

  componentDidMount () {
    this.initGame()
  }

  initGame = () => {
    const initialSquares = [
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false }
    ]
    const initialGame = initialSquares.map(square => initialSquares)
    const { gameWithFlags, flags } = this.setFlags(initialGame)
    const { game, flagCount } = this.setBombs(gameWithFlags, flags)
    this.setState({ game, flagCount })
    initialState = {
      ...this.state,
      game,
      flagCount
    }
  }

  setWidth = (width) => this.setState({ width })

  setBombs = (game, flags) => {
    let flagCount = Number(flags)
    const initialGame = [].concat(game)
    const maxBombs = 6

    for (let i = 0; i < maxBombs; i++) {
      const bombRow = Math.floor(Math.random() * 8)
      const bombCol = Math.floor(Math.random() * 8)
      const tempRow = [].concat(initialGame[bombRow])

      if (tempRow[bombCol].value === 'bomb') {
        continue
      }

      const prevRow = [].concat(initialGame[bombRow - 1])
      const nextRow = [].concat(initialGame[bombRow + 1])
      
      if (tempRow[bombCol].value === 'flag') {
        flagCount -= 1
      }
      tempRow[bombCol] = { ...tempRow[bombCol], value: 'bomb' }
      
      tempRow = this.safeSetNearToBomb(tempRow, bombCol +1)
      tempRow = this.safeSetNearToBomb(tempRow, bombCol -1)
      initialGame[bombRow] = tempRow
      
      if (prevRow.length > 1) {
        prevRow = this.safeSetNearToBomb(prevRow, bombCol)
        prevRow = this.safeSetNearToBomb(prevRow, bombCol -1)
        prevRow = this.safeSetNearToBomb(prevRow, bombCol +1)
        initialGame[bombRow - 1] = prevRow
      }
      
      if (nextRow.length > 1) {
        nextRow = this.safeSetNearToBomb(nextRow, bombCol)
        nextRow = this.safeSetNearToBomb(nextRow, bombCol -1)
        nextRow = this.safeSetNearToBomb(nextRow, bombCol +1)
        initialGame[bombRow + 1] = nextRow
      }
    }

    return { game: initialGame, flagCount }
  }

  safeSetNearToBomb = (row, col) => {
    if (row[col] === undefined || typeof row[col].value !== 'number') {
      return row
    }
    row[col] = { 
      ...row[col],
      value: row[col].value + 1
    }
    return row
  }

  setFlags = (game) => {
    const initialGame = [].concat(game)
    let flags = 6
    for(let i = 0; i < 6; i++) {
      const flagRow = Math.floor(Math.random() * 8)
      const flagCol = Math.floor(Math.random() * 8)
      const tempRow = [].concat(initialGame[flagRow])
      if (tempRow[flagCol].value === 'flag') {
        flags -= 1
      }
      tempRow[flagCol] = { ...tempRow[flagCol], value: 'flag' }
      initialGame[flagRow] = tempRow
    }
    return { gameWithFlags: initialGame, flags }
  }

  setActive = (rowIndex, colIndex) => {
    let { flagCount, bombCount } = this.state
    const game = this.state.game.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((col, cIndex) => {
          if (cIndex === colIndex) {
            return {
              ...col,
              active: true
            }
          }
          return col
        })
      }
      return row
    })
    if (game[rowIndex][colIndex].value === 'bomb') {
      this.setState({ game, bombCount })
      setTimeout(() => this.setState({ status :'gameOver' }), 500)
    }
    if (game[rowIndex][colIndex].value === 'flag') {
      flagCount -= 1
      this.setState({ game, flagCount })
      if (flagCount === 0) {
        Alert.alert(
          'Você venceu!!!',
          '',
          [{ text: 'Ok', onPress: () => {
            this.initGame()
            this.setState({
              status: 'newGame'
            })
          }}],
          { cancelable: false }
        )
      }
      return
    }
    this.setState({ game })
  }

  restart = () => {
    this.initGame()
    this.setState({ status: 'inGame' })
  }

  render () {
    const { game, bombCount, flagCount, status } = this.state
    const squareSize = (Dimensions.get('window').width - 40) / 8
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        { status === 'inGame' && <Header bombCount={bombCount} flagCount={flagCount} /> }
          <View style={styles.container}>
            { status === 'newGame' && <NewGame onPress={() => this.setState({ status: 'inGame' })} /> }
            { status === 'gameOver' && <GameOver onPress={this.restart} /> }
            { status === 'inGame' && (
              <View style={styles.game}>
              {
                game.map((row, rIndex) => (
                  <View style={styles.row} key={rIndex}>
                    {row.map((col, cIndex) => (
                      <Square
                        key={cIndex}
                        style={{ height: squareSize, width: squareSize }}
                        onPress={() => this.setActive(rIndex, cIndex)}
                        {...col}
                      />
                    ))}
                  </View>
                ))
              }
            </View>   
          )}
        </View>
      </SafeAreaView>
    )
  }
  
}