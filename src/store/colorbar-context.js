import { createContext } from 'react'

const colorbarContext=createContext({
    colorbarState:{},
    handleStrokeColor: ()=>{},
})

export default colorbarContext;