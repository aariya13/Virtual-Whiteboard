import { createContext } from 'react'

const colorbarContext=createContext({
    colorbarState:{},
    handleStrokeColor: ()=>{},
    handleFillColor:()=>{},
    handleSizeOption: ()=>{},
})

export default colorbarContext;