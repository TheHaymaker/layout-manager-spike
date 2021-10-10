import { v4 as uuidv4 } from 'uuid';

export const createNewLayout = (selectedOption: Archetype & SelectOption) => {

  const id = uuidv4()
  return  {
    "id": id,
    "archetype": selectedOption.id,
    "name": `${selectedOption.label}`,
    "bookAssociations": [],
    "viewSettings": {
      "hypotheticalPosition": false
    },
    "columnData":[
      {"isin": "3985029CN8"}
    ],
    "layout": {
      "i": id,
      "x": 0,
      "y": 0,
      "w": 6,
      "h": 6,
      "minW": 0,
      "maxW": 999999,
      "minH": 0,
      "maxH": 999999,
      "static": false,
      "isDraggable": true,
      "isResizable": true,
      "resizeHandles?": ["se"],
      "isBounded": false
    }
  }
}
