import React, {useState} from 'react'
import styled from 'styled-components'

function Choice(props){


  return(
    <>
    <ChoiceWrapper 
    onClick={()=>props.handleClick()} 
    style={{backgroundColor: props.color}}
    >
      <ChoiceContent>{props.choice.content}</ChoiceContent>
    </ChoiceWrapper> 
    </>
  )
}

const ChoiceWrapper = styled.div`
  width: 18em;
  margin: 10px 0;
  border: 1px solid black;
`
const ChoiceContent = styled.p`
  margin: 3px 0;
  padding-left: 1em;
`

export default Choice