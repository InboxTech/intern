import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

 /*let [counter, setcounter]= useState(5)
  let counter = 15

  const addcounter = () => {
    console.log("clicked", counter);
    //counter +=  1
    setcounter(counter +1)
  }
    
  const removecounter = () => {
    setcounter(counter-1);
    console.log("clicked", counter);
  }*/
 let [counter, setcounter] = useState(0)
 const addcounter = () => {
  if (counter == 20){
    setcounter(counter = 20)
  }
  else{
    setcounter(counter+1)
  }
  }
  const removecounter = () => {
    if (counter > 0){
      setcounter(counter - 1)
    }
    else{
      setcounter(counter = 0)
    }
  }
  return (
  <>
      <h1>Chai aur react</h1>
      <h2>Counter counter: {counter}</h2>
      <button onClick={addcounter}>Add counter{counter}</button>
      <br/>
      <button onClick={removecounter}>Decrease counter{counter}</button>
      <p>Footer:{counter}</p>
      </>
  )
}

export default App
