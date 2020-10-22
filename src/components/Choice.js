import React from 'react'

function Choice(props){

  const choice = props.choice
  const click = (e) => {
    if (props.handleClick !== ""){
      props.handleClick(choice)
    }
  }

  return(
    <>
    <div 
      className={props.styling}
      id={props.chosen}
      onClick={click} 
    >
      {props.chosen === "" ? null : props.choice.answer ? <span>&#10004;</span> : <span>&#10006;</span>}
      <p>{choice.content}</p>
    </div> 
    </>
  )
}


export default Choice