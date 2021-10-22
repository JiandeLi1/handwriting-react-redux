import './App.css';
import React, { useState, useContext, useEffect } from 'react'
import { store, connect, appContext } from './redux'

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
const B = () => <section>B <UserModifier> xxx</UserModifier></section>
const C = () => <section>C</section>
const User = connect(state => { return { user: state.user } })(({ user }) => {
  return <div>{ user.name }</div>
 
})




const UserModifier = connect()(({ dispatch, state, children }) => {
  const change = (e) => {
     dispatch({ type: 'updateUser', payload:{ name: e.target.value }})
  }
  return (
    <div>
      { children }
      <input value={state.user.name } onChange= { change }></input>
    </div>
  )
})


