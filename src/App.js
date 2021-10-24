import './App.css';
import React from 'react'
import { store, appContext } from './redux'
import { connectToUser } from './Connect/userConnect'

export default function App() {
  return (
    <appContext.Provider value={ store }>
      <A />
      <B />
      <C />
    </appContext.Provider>
    
  );
}

const A = () => <section>A <User /></section>
const B = () => <section>B <UserModifier>xxx</UserModifier></section>
const C = () => <section>C</section>



const User = connectToUser(({ user }) => {
  return <div>{ user.name }</div>
})

const UserModifier = connectToUser(({ updateUser, user, children }) => {
  const change = (e) => {
    updateUser({ name: e.target.value })
    console.log(updateUser)
  }
  return (
    <div>
      { children }
      <input value={ user.name } onChange= { change }></input>
    </div>
  )
})


