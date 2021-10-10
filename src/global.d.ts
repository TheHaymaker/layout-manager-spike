interface Column {
  "isin": string
}

type Archetype = {
  id: string | number,
  name: string
}

type SelectOption = {
  value: string;
  label: string;
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
