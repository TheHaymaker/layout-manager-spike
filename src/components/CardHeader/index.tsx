import React from 'react'
import styled from 'styled-components'
import {MdSettings, MdClose} from 'react-icons/md'

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

    button {
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

type CardHeaderProps = {
  title: string;
  viewId: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title = '',
  viewId
}) => {
  return (
    <CardHeaderWrapper>
      <h6>
        {title}
      </h6>
      <div className="btnContainer">
        <button>
        <MdSettings />
        </button>
        <button>
        <MdClose />
        </button>
      </div>
    </CardHeaderWrapper>
  )
}
