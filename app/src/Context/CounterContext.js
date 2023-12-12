import { createContext, useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider(props){
    const [counter,setCounter] = useState(0)
    function increasecount(){
        setCounter(counter+1)
    }
    return <CounterContext.Provider value={{counter , increasecount}}>
        {props.children}
    </CounterContext.Provider>
}