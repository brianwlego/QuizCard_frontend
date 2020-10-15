import React from 'react'

function Choice(props){

  return(
    <>
    <div 
    className="choice-wrapper"
    onClick={()=>props.handleClick()} 
    style={{backgroundColor: props.color}}
    >
      <p>{props.choice.content}</p>
    </div> 
    </>
  )
}


export default Choice