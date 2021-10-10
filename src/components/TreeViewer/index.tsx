import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import './treeViewer.css'

export const TreeViewer: React.FC = (props) => {
  const [open, setOpen] = useState(false)

  const handleDismiss = () => setOpen(false)

  const minHeight = '500'
  return (
    <>
      <button onClick={() => setOpen(true)}>Select Books</button>
      <BottomSheet 
        open={open}
        onDismiss={handleDismiss}
        snapPoints={({minHeight}) => minHeight}
      >
        <div className="bottomSheet-container">
          {props.children}
          <div style={{textAlign: "center"}}>
            <button onClick={handleDismiss}>
              Dismiss
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  )
}
