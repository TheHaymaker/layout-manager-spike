import React, {useState} from 'react'
import styled from 'styled-components'
import {MdSettings, MdClose} from 'react-icons/md'
import { BookMapper } from '..'

const Button = styled.div`
position: relative;
display: flex;
`

const CardHeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
align-content: flex-end;
width: 100%;
border-radius: 3px;
border: 1px solid #00000014;
margin-bottom: 2px;

h6 {
  margin: 5px;
  font-size: 12px;
  }

  .btnContainer {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    & button,
    & div button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;

      &:hover,
      &:focus {
        background-color: #ffdd98;
        box-shadow: 0px 0px 5px -1px #b97802;
      }
    }
  }
`

const ContextMenu = styled.div`
position: absolute;
top: 0;
right: 100%;
width: auto;
height: auto;
opacity: 0;
padding: 8px;
border-radius: 3px;
background-color: #fcfcfc;
box-shadow: 0px 6px 7px -8px black;
pointer-events: none;
transition: 0.25s opacity ease-in-out;

& ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

& ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
  opacity: 0;
  transition: 0s opacity ease-in-out;
}

&.visible {
  display: block;
  opacity: 1;
  pointer-events: all;
  transition: 0.25s opacity ease-in-out;
}

&.visible ul,
&.visible ul {
  opacity: 1;
  transition: 0.25s opacity ease-in-out;
}
`

type CardHeaderProps = {
  title: string;
  viewId: string;
  handleRemoveLayout?: any
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title = '',
  viewId,
  handleRemoveLayout = null
}) => {

  const [isVisible, setIsVisible] = useState(false)
  /**
   * ---
   * ## BookMapper State
   * ---
   */
   const [checked, setChecked] = useState([])
   const [expanded, setExpanded] = useState([])
  return (
    <CardHeaderWrapper>
      <h6>
        {title}
      </h6>
      <div className="btnContainer">
        <Button>
          <button onClick={() => {
            setIsVisible(prev => !prev)
          }}>
            <MdSettings />
          </button>
          <ContextMenu className={`${isVisible ? 'visible' : ''}`}>
            <ul>
              <li className="listItem" style={{
                paddingBottom: "5px",
                borderBottom: "1px solid black"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center"
                }}>
                <label style={{
                  fontSize: "10px"
                }} htmlFor="hypothetical">Include "Hypothetical" positions?</label>
                <input name="hypothetical" type="checkbox" />
                </div>
              </li>
              <li className="listItem">
                <div style={{
                  display: "block",
                  width: "max-content"
                }}>
                  
                  <BookMapper
                    expanded={expanded}
                    onExpanded={setExpanded}
                    checked={checked}
                    onChecked={setChecked}
                  />

                
                </div>
              </li>
              
            </ul>
          </ContextMenu>
        </Button>
        <button onClick={() => {handleRemoveLayout(viewId)}}>
        <MdClose />
        </button>
      </div>
    </CardHeaderWrapper>
  )
}
