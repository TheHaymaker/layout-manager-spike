import React from 'react'
import RGL, { WidthProvider } from "react-grid-layout";

import styled from 'styled-components'
import { CardHeader } from '../../components';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './layoutManager.css'

const ReactGridLayout = WidthProvider(RGL);
const RiskViewCard = styled.div`
background: #e9e9e9;
border-radius: 3px;
border: 1px solid #00000014;
box-shadow: 0px 6px 9px -5px #666666;
display: flex;
flex-direction: column;
`

const CardWrapper = styled.div`
width: 100%;
height: 100%;
box-sizing: border-box;
padding: 6px;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto 1fr;
`
const CardContentWrapperScrollbarOffset = styled.div`
width: 100%;
padding-right: 4px;
padding-bottom: 4px;
box-sizing: border-box;
overflow: hidden;
`

const CardContentWrapper = styled.div`
width: 100%;
height: 100%;
overflow: auto;
&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0.3);
  border-radius: 3px;
}

&::-webkit-scrollbar-thumb {
background-color: #fcfcfc;
border-radius: 3px;
}
`

interface LayoutManagerProps {
  layouts: LayoutDetails[],
  views: Layout[]
  handleLayoutChange?: any,
  handleRemoveLayout?: any
}

export const LayoutManager: React.FC<LayoutManagerProps> = ({
  layouts = [],
  views = [],
  handleLayoutChange = null,
  handleRemoveLayout = null
}) => {

  
  return (
    <ReactGridLayout onLayoutChange={handleLayoutChange} className="layout" layout={layouts} cols={24} rowHeight={30} width={1200}>
    {layouts.map((lt: LayoutDetails, index) => {
      return (
        <RiskViewCard key={lt.i}>
        <CardWrapper>
          <CardHeader handleRemoveLayout={handleRemoveLayout} viewId={lt.i} title={views[index].name} />
          <CardContentWrapperScrollbarOffset>
            <CardContentWrapper>
              <hr />
              <hr />
              <hr />
              <hr />
              <hr />
              <hr />
              <hr />
              <hr />
            </CardContentWrapper>
          </CardContentWrapperScrollbarOffset>
        </CardWrapper>
      </RiskViewCard>
    )})}
  </ReactGridLayout>
  )
}
