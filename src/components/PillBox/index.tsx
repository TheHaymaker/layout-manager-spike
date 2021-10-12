import React from 'react'
import styled from 'styled-components'
// import {MdOutlineLibraryAdd} from 'react-icons/md'
import './pillBox.css'

const PillFlexWrapper = styled.div`
position: relative;
display: flex;
flex-wrap: wrap;
padding: 4px;
`
const PillList = styled.ol`
display: flex;
flex-wrap: wrap;
margin: 0px;
padding: 0px;
`
const PillListItem = styled.li`
margin: 2px;
list-style: none;
padding: 4px 8px;
text-transform: capitalize;
border: 1px solid #084ea7;
background-color: #0a7bcb;
box-shadow: 0px 8px 9px -9px #020202;
border-radius: 15px;
font-size: 11px;
color: #fcfcfc;
cursor: pointer;
transition: 0.25s all ease-in-out;
  &:hover,
  &:focus {
    background-color: #084ea7;
    box-shadow: 0px 10px 9px -9px #020202;
  }
}
`

const capitalizeFirstLetter= (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const PillBox: React.FC<{
  pills: any[]
}> = ({
  pills = []
}) => {
 
  return (
    <PillFlexWrapper>
      <PillList role="list" tabIndex={0}>
        {pills && pills.map(pill => (
          <PillListItem key={pill} role="listitem" title={`${capitalizeFirstLetter(pill)}`}>
            {`${(pill)}`}
          </PillListItem>
        ))}
      </PillList>
    </PillFlexWrapper>
  )
}
