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
  checked?: any[],
  expanded?: any[],
  onChecked?: any,
  onExpanded?: any;
}

export const BookMapper: React.FC<TreeProps> = ({
  nodes = sampleNodes,
  checked = [],
  expanded = [],
  onChecked = null,
  onExpanded = null
}) => {
  const [checkedLocal, setCheckedLocal] = useState<string[]>(checked)
  const [expandedLocal, setExpandedLocal] = useState<string[]>(expanded)
  return (
    <CheckboxTree
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      onCheck={checkedOpts => {
        setCheckedLocal(checkedOpts)
        if(onChecked) {
          onChecked(checkedOpts)
        }
      }}
      onExpand={expandedOpts => {
        setExpandedLocal(expandedOpts)
        if(onExpanded) {
          onExpanded(expandedOpts)
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
