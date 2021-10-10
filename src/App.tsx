import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { LayoutManager, AddRiskView, TreeViewer, BookMapper } from './components';
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
    }, 1000);
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
      const views = await getData('http://localhost:3004/layouts')
      const layoutData = views.map((lt: Layout) => lt.layout)
        setArchetypes(archetypes)
        setViews(views)
        setLayouts(layoutData)
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

  const [compositions, setCompositions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(null)

  return (
    <div className="App">
      <CompositionContainer>
          <TreeViewer>
            <BookMapper />
          </TreeViewer>
        <div>
        <CreatableSingle 
          options={compositions} 
          setOptions={setCompositions} 
          setValue={setValue} 
          value={value} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
        />
        </div>
        <div>
          <AddRiskView archetypes={archetypes} handleAddViewUpdate={handleSetViews} />
        </div>
      </CompositionContainer>
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
