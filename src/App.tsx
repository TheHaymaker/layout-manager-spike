import React, {useState, useEffect} from 'react';
import ResponsiveGridLayout from 'react-grid-layout';
import styled from 'styled-components'
import { getData, postData } from './api';
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

type Book = {
  id: string | number,
  name: string
}

interface Column {
  "isin": string
}
interface LayoutDetails {
  "i": string,
  "x": number,
  "y": number,
  "w": number,
  "h": number,
  "minW": number,
  "maxW": number,
  "minH": number,
  "maxH": number,
  "static": boolean,
  "isDraggable"?: boolean,
  "isResizable"?: boolean,
  "resizeHandles?"?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>,
  "isBounded": boolean
}
type Layout = {
  "id": number | string,
  "archetype": number | string,
  "name": string,
  "bookAssociations": string[],
  "viewSettings": {
    "hypotheticalPosition": boolean
  },
  "columnData":Column[]
  "layout": LayoutDetails
}

const RiskViewCard = styled.div`
background: lightblue;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;
`

const App = () => {

  const [books, setBooks] = useState([])
  const [layouts, setLayouts] = useState<LayoutDetails[]>([])
  useEffect(() => {
    const getAllTheData = async () => {
      const books = await getData('http://localhost:3004/archetypes')
      const layouts = await getData('http://localhost:3004/layouts')
      const layoutData = layouts.map((lt: Layout) => lt.layout)
        setBooks(books)
        setLayouts(layoutData)
    }
    getAllTheData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
       {books && books.map((book: Book) => (
        <span key={book.id}>{book.name}</span>
       ))}
      </header>
      <ResponsiveGridLayout className="layout" layout={layouts} cols={12} rowHeight={30} width={1200}>
        {layouts.map((lt: LayoutDetails) => {
          console.log(lt)
          return (
          <RiskViewCard key={lt.i}>{lt.i}</RiskViewCard>
        )})}
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
