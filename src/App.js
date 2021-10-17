import './App.css';
import React, { useState, useContext } from 'react'
const appContext = React.createContext(null)
export default function App() {
  const [appState, setAppState] = useState({
    user: {name:'ALEX', age:18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={ contextValue }>
      <A />
      <B />
      <C />
    </appContext.Provider>
    
  );
}

const A = () => <section>A <User /></section>
const B = () => <section>B <UserModifier> xxx</UserModifier></section>
const C = () => <section>C</section>
const User = () => {
  const { appState, setAppState} = useContext(appContext)
  return <div>{ appState.user.name }</div>
 
}

//Reducer is a function to standardize the State creation process
const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

const connect = (Component) => {
  return (props) => {
    //Hook need to work inside the component
    const { appState, setAppState } = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }
    return <Component dispatch={dispatch} state={appState} {...props}/>
  }
}
const UserModifier = connect(({ dispatch, state, children }) => {
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


