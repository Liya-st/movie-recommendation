import React from 'react'

export default function SearchBox(props) {
  return (
    <div>
            <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  id="search-navbar"
                  value={props.value}
                  onChange={e => props.setSearchItem(e.target.value)} 
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                   bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
    </div>
  )
}
