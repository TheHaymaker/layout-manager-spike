import React, {useState} from 'react'
import {MdCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineIndeterminateCheckBox, MdChevronRight, MdExpandMore, MdLibraryBooks, MdBallot, MdOutlineBallot} from 'react-icons/md'
import {FcFolder, FcOpenedFolder} from 'react-icons/fc'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './bookMapper.css'

interface TreeNode {
  value: string,
  label: string,
  children?: TreeNode[],
}

const sampleNodes = [{
  value: 'mars',
  label: 'Mars',
  children: [
      { 
        value: 'phobos', 
        label: 'Phobos', 
        children: [
        { value: 'phobos2', label: 'Phobos2' },
        { value: 'deimos2', label: 'Deimos2' }
      ]},
      { value: 'deimos', label: 'Deimos' },
  ],
}];

type TreeProps = {
  nodes?: TreeNode[],
  onCheckedCallback?: any,
  onExpandedCallback?: any;
}

export const BookMapper: React.FC<TreeProps> = ({
  nodes = sampleNodes,
  onCheckedCallback = null,
  onExpandedCallback = null
}) => {
  const [checked, setChecked] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>([])
  return (
    <CheckboxTree
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      onCheck={checkedOpts => {
        setChecked(checkedOpts)
        if(onCheckedCallback) {
          onCheckedCallback(checkedOpts)
        }
      }}
      onExpand={expandedOpts => {
        setExpanded(expandedOpts)
        if(onExpandedCallback) {
          onExpandedCallback(expandedOpts)
        }
      }}
      icons={{
        check: <MdCheckBox />,
        uncheck: <MdOutlineCheckBoxOutlineBlank />,
        halfCheck: <MdOutlineIndeterminateCheckBox />,
        expandClose: <MdChevronRight />,
        expandOpen: <MdExpandMore />,
        expandAll: <MdOutlineBallot />,
        collapseAll: <MdBallot />,
        parentClose: <FcFolder  />,
        parentOpen:<FcOpenedFolder />,
        leaf: <MdLibraryBooks />
    }}
    />
  )
}
