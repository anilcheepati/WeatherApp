import React,{ useState } from 'react'
import "./App.css"
import Weather from './components/weather/Weather'

import './App.css'

function App() {

  const [bgColor, setBgColor] = useState("");  // New state for background color
  

  return (
    <div className={`App ${bgColor} `}>
      <Weather setBgColor={setBgColor}/>
      
    </div>
  )
}

export default App
