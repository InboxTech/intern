import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 class='bg-green-400 text-black p-4 rounded-xl'>Talwind</h1>
   <Card channel="Jinal"/>
    </>
  )
}
function Tail() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="app">
      <Card title="My Card" content="content" />
      <Card title="Another Card" content="More content here." />
    </div>
    </>
  )
}
export default App
