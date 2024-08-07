import React, { useState } from 'react'


const Search = ({ handleSearch }) => {

    const [search, setSearch] = useState("")

    function handleInputSearch(event) {
        setSearch(event.target.value)

    }


    function handleButtonSearch() {
        handleSearch(search)
    }


    return (
        <div className="search-input">

            <input type="text"
                placeholder='Enter City Name'
                name="search"
                value={search}
                onChange={handleInputSearch}
            />


            <button className="search-btn" onClick={handleButtonSearch}>Search</button>
        </div>
    )
}

export default Search