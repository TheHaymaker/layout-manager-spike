import React, {useState} from 'react'
import styled from 'styled-components'
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {MdOutlineLibraryAdd} from 'react-icons/md'
import {createNewLayout} from '../../utils'

const createSelectOptions = (opts: Archetype[]) => opts.map(opt => ({value: opt.name, label: opt.name, id: opt.id, name: opt.name}))

interface AddRiskViewProps {
  archetypes: Archetype[],
  handleAddViewUpdate?: any
}

const ButtonContainer = styled.div`
position: relative;
`

const ViewSelectionContainer = styled.div`
position: absolute;
right: 100%;
top: 0;
margin-right: 5px;
opacity: 0;
width: 1px;
pointer-events: none;
transition: 0.25s opacity ease-in-out, 0s width ease 0.2s;

&.visible {
  display: block;
  opacity: 1;
  width: 150px;
  pointer-events: all;
  transition: 0.25s opacity ease-in-out, 0.5s width ease;
}
`

export const AddRiskView: React.FC<AddRiskViewProps> = ({
  archetypes,
  handleAddViewUpdate = null
}) => {

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [value, setValue] = useState<SelectOption & Archetype | null>(null)

  const handleClick = () => {
    setIsVisible(prev => {
      if(prev) {
        setTimeout(() => setValue(null), 500)
        return !prev
      }
      return !prev
    })
  }

  const handleChange = (
    newValue: OnChangeValue<SelectOption & Archetype, false>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if(newValue !== null) {
      // use newValue to create a new view
      const freshLayout = createNewLayout(newValue)
      // seed the new view in layouts
      if(handleAddViewUpdate) {
        handleAddViewUpdate(freshLayout)
      }
      // hide the dropdown
      setIsVisible(false)
      setValue(newValue)

    }
  };
  return (
    <ButtonContainer>
      <button onClick={handleClick}>
        <MdOutlineLibraryAdd />
      </button>

     <ViewSelectionContainer className={`${isVisible ? 'visible' : ''}`}>
        <Select
          onChange={handleChange}
          options={createSelectOptions(archetypes)}
          value={value}
        />
     </ViewSelectionContainer>
    
    </ButtonContainer>
  )
}
