"use client"

import { useState, useEffect } from "react"
import { Scissors, Hand, Square, RefreshCw, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

// Component to display the Stone-Paper-Scissors choice
const SPSChoice = ({ choice }) => {
  const Icon = choice === "rock" ? Square : choice === "paper" ? Hand : Scissors
  return (
    <motion.div
      className="p-6 rounded-full bg-purple text-white shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon size={48} />
    </motion.div>
  )
}

// Component to render the Tic-Tac-Toe board
const TicTacToeBoard = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {squares.map((square, i) => (
        <motion.button
          key={i}
          className="w-24 h-24 bg-blue-light text-4xl font-bold flex items-center justify-center rounded-xl shadow-md text-white"
          onClick={() => onClick(i)}
          whileHover={{ scale: 1.05, backgroundColor: "#60A5FA" }}
          whileTap={{ scale: 0.95 }}
        >
          {square}
        </motion.button>
      ))}
    </div>
  )
}

// Component to display game results
const ResultDisplay = ({ result }) => {
  return (
    <motion.div
      className="mt-6 text-2xl font-bold text-purple"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {result}
    </motion.div>
  )
}

// Main Game component
const Game = () => {
  // State variables
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [winner, setWinner] = useState(null)
  const [gamePhase, setGamePhase] = useState("sps")
  const [player1Choice, setPlayer1Choice] = useState(null)
  const [player2Choice, setPlayer2Choice] = useState(null)
  const [spsResult, setSpsResult] = useState(null)
  const [currentSPSPlayer, setCurrentSPSPlayer] = useState("player1")
  const [lastWinner, setLastWinner] = useState(null)

  // Function to calculate the winner of Tic-Tac-Toe
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  // Effect to check for a winner after each move
  useEffect(() => {
    const newWinner = calculateWinner(squares)
    if (newWinner) {
      setWinner(newWinner)
      setGamePhase("gameOver")
    } else if (squares.every(Boolean)) {
      setGamePhase("gameOver")
    }
  }, [squares, calculateWinner]) // Added calculateWinner to dependencies

  // Handle Tic-Tac-Toe square click
  const handleTicTacToeClick = (i) => {
    if (winner || squares[i] || gamePhase !== "tictactoe") {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = currentPlayer
    setSquares(nextSquares)
    setGamePhase("sps")
    setCurrentSPSPlayer("player1")
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setSpsResult(null)
  }

  // Handle Stone-Paper-Scissors choice
  const handleSPSClick = (player) => {
    const choice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
    if (player === "player1") {
      setPlayer1Choice(choice)
      setCurrentSPSPlayer("player2")
    } else {
      setPlayer2Choice(choice)
      determineSPSWinner(player1Choice, choice)
    }
  }

  // Determine the winner of Stone-Paper-Scissors
  const determineSPSWinner = (player1Choice, player2Choice) => {
    if (player1Choice === player2Choice) {
      setSpsResult("tie")
      setTimeout(() => {
        setPlayer1Choice(null)
        setPlayer2Choice(null)
        setSpsResult(null)
        setCurrentSPSPlayer("player1")
      }, 1500)
    } else if (
      (player1Choice === "rock" && player2Choice === "scissors") ||
      (player1Choice === "paper" && player2Choice === "rock") ||
      (player1Choice === "scissors" && player2Choice === "paper")
    ) {
      setSpsResult("player1")
      setLastWinner("player1")
      setTimeout(() => {
        setGamePhase("tictactoe")
        setCurrentPlayer("X")
      }, 1500)
    } else {
      setSpsResult("player2")
      setLastWinner("player2")
      setTimeout(() => {
        setGamePhase("tictactoe")
        setCurrentPlayer("O")
      }, 1500)
    }
  }

  // Reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setGamePhase("sps")
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setSpsResult(null)
    setCurrentSPSPlayer("player1")
    setLastWinner(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center p-4">
      <Card className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-purple text-white rounded-t-lg">
          <CardTitle className="text-4xl font-bold text-center">Tic-Tac-Toe Royale</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {gamePhase === "sps" && (
              <motion.div
                key="sps"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-blue-50 p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-2xl font-semibold mb-4 text-center text-purple-dark">Stone-Paper-Scissors Round</h2>
                <div className="flex justify-between items-center w-full gap-8">
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl mb-2 text-blue-dark">Player 1 (X)</h3>
                    {player1Choice ? (
                      <SPSChoice choice={player1Choice} />
                    ) : (
                      <Button
                        onClick={() => handleSPSClick("player1")}
                        disabled={currentSPSPlayer !== "player1"}
                        variant="outline"
                        className="bg-purple text-white hover:bg-purple-dark"
                      >
                        Choose 
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl mb-2 text-blue-dark">Player 2 (O)</h3>
                    {player2Choice ? (
                      <SPSChoice choice={player2Choice} />
                    ) : (
                      <Button
                        onClick={() => handleSPSClick("player2")}
                        disabled={currentSPSPlayer !== "player2"}
                        variant="outline"
                        className="bg-purple text-white hover:bg-purple-dark"
                      >
                        Choose 
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {spsResult && (
            <ResultDisplay
              result={
                spsResult === "tie"
                  ? "It's a tie! Play again."
                  : `${spsResult === "player1" ? "Player 1" : "Player 2"} wins the SPS round!`
              }
            />
          )}
          <div className="flex justify-center">
            <TicTacToeBoard squares={squares} onClick={handleTicTacToeClick} />
          </div>
          {winner && <ResultDisplay result={`${winner} wins the game!`} />}
          {!winner && squares.every(Boolean) && <ResultDisplay result="It's a draw!" />}
          {gamePhase === "tictactoe" && !winner && (
            <div className="mt-4 text-xl text-center text-blue-dark font-semibold">
              {`${currentPlayer === "X" ? "Player 1" : "Player 2"}'s turn (${currentPlayer})`}
            </div>
          )}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={resetGame}
              variant="outline"
              className="bg-blue text-white hover:bg-blue-dark flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Reset Game
            </Button>
            {gamePhase === "gameOver" && (
              <Button onClick={resetGame} className="bg-purple text-white hover:bg-purple-dark flex items-center gap-2">
                <Play size={16} />
                Start New Game
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Game

