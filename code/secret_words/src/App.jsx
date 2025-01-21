//HOOKS
import { useCallback, useEffect, useState } from 'react'

// COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//CSS
import './App.css'

//DATA
import { wordsList } from './data/words'

// Game stages
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)
  
  const pickedWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * Object.keys(words[category]).length)]
    
    return {word, category}
  }

  // Start game
  const startGame = () => {
    // pick word and category
    const {word, category} = pickedWordAndCategory()
    
    // split word
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())
    
    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name)
    console.log(`Categoria: ${category} - Palavra: ${word}`)
    console.log(`Word Split: ${wordLetters}`)
  }

  // Process input
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase()

    //Check if letter has already been utilized
    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return
    }

    // Push guessed letter or remove a guess
    if (letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])  
    }
  }

  console.log(guessedLetters)
  console.log(wrongLetters)

  // Restart the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}

      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}

      {gameStage === 'end' && <GameOver retry={retry}/>}
    </>
  )
}

export default App
