import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { LayoutManager, AddRiskView } from './components';
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
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setValue(newValue)
  };
  const handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }

  const handleCreate = (inputValue: string) => {
    setIsLoading(true)
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(() => {
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
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
    setViews(prev => ([...prev, newView]))
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

  useEffect(() => {
    console.log(views)
    const layoutData = views.map((lt: Layout) => lt.layout)
    setLayouts(layoutData)

  }, [views])

  const [compositions, setCompositions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(null)

  return (
    <div className="App">
      <CompositionContainer>
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
      <header className="App-header">
       {archetypes && archetypes.map((archetype: Archetype) => (
        <span key={archetype.id}>{archetype.name}</span>
       ))}
      </header>
      <LayoutManager
        views={views}
        layouts={layouts}
      />
    </div>
  );
}

export default App;
