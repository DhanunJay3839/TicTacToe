import { View, Text, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const [xscore,setXscore] = useState(0);
  const [oscore,setOscore] = useState(0);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);

      if (newBoard[index] === "X") {
          setXscore(prev => prev + 1)   
        } else {
          setOscore(prev => prev + 1)   
        }
      Alert.alert("Winner!", `Player ${newBoard[index]} wins `) 
        return
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Title */}
      <View style={{ height: 72, justifyContent: 'center', alignItems: 'center',width:'100%',backgroundColor:'#F8F8F8'}}>
        <Text style={{ fontSize: 24, fontWeight: '500'}}>Tic Tac Toe</Text>
      </View>

      {/* Scores */}
      <View style={{ height: 88, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10,marginTop:10}}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#666',fontWeight:'500' }}>Player X</Text>
          <Text style={{ fontSize: 24, color: '#2B7FFF',marginTop:5 }}>{xscore}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>vs</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#666',fontWeight:'500' }}>Player O</Text>
          <Text style={{ fontSize: 24, color: '#FF4B4B',marginTop:5  }}>{oscore}</Text>
        </View>
      </View>

      {/* Status */}
      <View style={{ marginTop: 40, alignSelf: 'center' }}>
        <Text style={{ fontSize: 20, color: '#666',fontWeight:'500' }}>
          {winner ? `Winner: ${winner}` : `Turn: ${xIsNext ? 'X' : 'O'}`}
        </Text>
      </View>

      {/* Board */}
      <View style={{height: 302,width: 302,borderWidth:1,borderColor:'black',alignSelf: 'center',marginTop: 30,flexDirection: 'row',flexWrap: 'wrap'}}>
        {board.map((val, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            style={{height: 100,width: 100,borderWidth: 1,borderColor: 'black',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Restart */}
      <TouchableOpacity
        style={{height: 48,width: 200,alignSelf: 'center',backgroundColor: '#6200EE',borderRadius: 30,justifyContent: 'center',alignItems: 'center',marginTop: 100}}
        onPress={restartGame}>
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>
          Restart Game
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen
