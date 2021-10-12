import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {MdOutlineSave} from 'react-icons/md'
import { LayoutManager, AddRiskView, TreeViewer, BookMapper, PillBox } from './components';
import { getData, postData } from './api';
import './App.css';

import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';



interface SelectProps {
  options: SelectOption[],
  setOptions: any,
  isLoading: boolean,
  setIsLoading: any,
  value: SelectOption | null,
  setValue: any,
  onCreateCallback?: any
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});
export const CreatableSingle:React.FC<SelectProps> = ({
  options,
  setOptions,
  isLoading,
  setIsLoading,
  value,
  setValue,
  onCreateCallback = null

}) => {
  const handleChange = (
    newValue: OnChangeValue<SelectOption, false>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    setValue(newValue)
    if(onCreateCallback) {
      onCreateCallback(newValue)
    }
  };
  const handleInputChange = (inputValue: any, actionMeta: any) => {
    
  }

  const handleCreate = (inputValue: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false)
      setOptions([...options, newOption])
      setValue(newOption)
      if(onCreateCallback) {
        onCreateCallback(newOption)
      }
    }, 800);
  };
  
    return (
      <CreatableSelect
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={handleCreate}
        value={value}
      />
    );
  
}

const CompositionContainer = styled.div`
display: flex;
margin: 4px;
padding: 4px;
border: 1px solid grey;
justify-content: space-between;
`

const FlexWrapper = styled.div`
display: flex;
justify-content: space-between;

> * {
  margin: 2px;
}
`

const App = () => {

  const [archetypes, setArchetypes] = useState([])
  const [layouts, setLayouts] = useState<LayoutDetails[]>([])
  const [views, setViews] = useState<Layout[]>([])
  const handleSetViews = (newView: Layout) => {
    setViews(prev => {
      const newViews = [...prev, newView]
      const layoutData = newViews.map((lt: Layout) => lt.layout)
      setLayouts(layoutData)
      return newViews
    })
  }

  const saveComposition = () => {
    if(currentCompositionName) {
      postData('http://localhost:3004/compositions', {
        name: currentCompositionName,
        id: new Date().getTime(),
        layoutData: views
      })
      .then(msg => console.log(msg))
      .catch(err => console.error(err))
    }
  } 

  const handleLayoutChange = (opts: any) => {
    setViews(prev => {
      const newViews = prev.map(view => {
      const updatedLayout = opts.find((layout: LayoutDetails) => layout.i === view.id)
      if(updatedLayout) {
        return Object.assign({}, view, {layout: updatedLayout})
      }
      return view
    })

    const layoutData = newViews.map((lt: Layout) => lt.layout)
    setLayouts(layoutData)
    return newViews
  })
  }
  useEffect(() => {
    const getAllTheData = async () => {
      const archetypes = await getData('http://localhost:3004/archetypes')
      const compositions = await getData('http://localhost:3004/compositions')
      const views = compositions.length && compositions[0].layoutData ? compositions[0].layoutData : []
      const layoutData = compositions.length && compositions[0].layoutData ? compositions[0].layoutData.map((lt: Layout) => lt.layout) : []
        setArchetypes(archetypes)
        setViews(views)
        setLayouts(layoutData)
        setAllCompositions(compositions)
        setCompositions(() => {
           const options = compositions.map((comp: any) => createOption(comp.name))

           setValue(options[0])
           return options
        })
    }
    getAllTheData()
  }, [])

  const removeLayout = (layoutId: string) => {
    setViews(prev => {
      const newViews: Layout[] = prev.reduce((prevViews: Layout[], view) => {
      if(layoutId !== view.id) {
         return [...prevViews, view]
      }
      return prevViews
    }, [])

    const layoutData = newViews.map((lt: Layout) => lt.layout)
    setLayouts(layoutData)
    return newViews
  })
  }

  const [allCompositions, setAllCompositions] = useState([])
  const [compositions, setCompositions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(null)
  

  /**
   * ---
   * ## BookMapper State
   * ---
   */
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

    /**
   * ---
   * ## Composition Name
   * ---
   */
     const [currentCompositionName, setCurrentCompositionName] = useState()
     const setCompositionName = (val: any) => setCurrentCompositionName(val.label)

  return (
    <div className="App">
      <CompositionContainer>
       <FlexWrapper>
          <TreeViewer>
            <BookMapper
              expanded={expanded}
              onExpanded={setExpanded}
              checked={checked}
              onChecked={setChecked}
            />
          </TreeViewer>
          {/* <div style={{padding: "5px"}}></div> */}
        <CreatableSingle 
          options={compositions} 
          setOptions={setCompositions} 
          setValue={setValue} 
          value={value} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          onCreateCallback={setCompositionName}
        />

        <button 
          disabled={isLoading || (currentCompositionName === null)} 
          onClick={saveComposition}>
          <MdOutlineSave />
        </button>

       </FlexWrapper>
      
       <FlexWrapper>
          <AddRiskView archetypes={archetypes} handleAddViewUpdate={handleSetViews} />
       </FlexWrapper>
       
      </CompositionContainer>
      <FlexWrapper>
        <PillBox pills={checked}/>
      </FlexWrapper>
      <hr />
      <LayoutManager
        views={views}
        layouts={layouts}
        handleLayoutChange={handleLayoutChange}
        handleRemoveLayout={removeLayout}
      />
    </div>
  );
}

export default App;
