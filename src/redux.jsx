import React, { useState, useContext, useEffect } from 'react'
export const appContext = React.createContext(null)
const change = (oldData,newData) => {
  for (let key in oldData) {
    if (oldData[key] !== newData[key]) {
        return true
    }
  }
  return false
}
export const store = {
  state: {
    user: {name:'frank', age:18}
  },
  setState(newState){
    store.state = newState
    store.Listeners.map(fn=>fn(store.state))
  },
  Listeners: [],
  subscribe(fn) {
    store.Listeners.push(fn)
    return () => {
      const index = store.Listeners.indexOf(fn)
      store.Listeners.splice(index,1)
    }
  }
}
export const connect = ( selector )=>(Component) => {
  return (props) => {
    //Hook need to work inside the component
    const { state, setState } = useContext(appContext)
    const [, update] = useState({})
    const data = selector ? selector(state) : {state:state}
     useEffect(() =>  store.subscribe(() => {
         const newData = selector ? selector(store.state) : { state: store.state }
         if(change(data,newData)) update({})
       }), [selector]) 
      
    const dispatch = (action) => {
      setState(reducer(state, action))
    
    }
    return <Component dispatch={dispatch} {...data} {...props}/>
  }
}
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




