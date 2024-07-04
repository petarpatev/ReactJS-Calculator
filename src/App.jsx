import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className='container'>

      <div className='output'>
        <div className='previous'></div>
        <div className='current'></div>
      </div>

      <button className='span-two'>AC</button>
      <button>DEL</button>
      <button value='/'>/</button>
      <button value='1'>1</button>
      <button value='2'>2</button>
      <button value='3'>3</button>
      <button value='*'>*</button>
      <button value='4'>4</button>
      <button value='5'>5</button>
      <button value='6'>6</button>
      <button value='+'>+</button>
      <button value='7'>7</button>
      <button value='8'>8</button>
      <button value='9'>9</button>
      <button value='-'>-</button>
      <button value='.'>.</button>
      <button value='0'>0</button>
      <button className='span-two'>=</button>

    </div>
  )
}

export default App
