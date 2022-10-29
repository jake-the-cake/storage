import axios from 'axios'
import { FormEvent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Display } from './pages/Display'

function App() {
  const handleClick = ( event: FormEvent ) => {
    event.preventDefault()
    const input = document.getElementById( 'name-input' ) as HTMLInputElement
    axios.post('http://localhost:4200/add', {
      name: input.value
    }).catch(()=>console.log('error'))
  }

  return (
    <BrowserRouter>
      <div className='maincard'>
        <input id='name-input' type='text' placeholder='item' />
        <button onClick={ handleClick }>Add</button>
        <Routes>
          <Route path='/' element={ <Display /> }/>
          <Route path='/items' element={ <Display /> }/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
