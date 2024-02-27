import React from 'react'

type FilterboxItemProps = {
  key: string,
  name: string,
  index: number,
  sortSelection: string,
  handleSortAndFilter: Function,
  stateSetter: Function
}

const FilterboxItem: React.FC<FilterboxItemProps> = ({ name, index, sortSelection, handleSortAndFilter, stateSetter }) => {
  return (
    <li key={`${name}-${index}`} className={sortSelection === name ? 'active-filter' : ''} onClick={(event) => handleSortAndFilter(event, stateSetter)}>
        {name}
    </li>
  )
}
export default FilterboxItem