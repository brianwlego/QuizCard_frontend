import React from 'react'

function Choice(props){



  return(
    <>
    <div 
    className={props.styling}
    onClick={()=>props.handleClick()} 
    >
      <p>{props.choice.content}</p>
    </div> 
    </>
  )
}


export default Choice