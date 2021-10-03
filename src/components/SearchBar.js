import {useState} from "react"

function SearchBar({handleSearch, resource}) {
    const [search,setSearch] = useState("")

    function handleChange(event) {
        setSearch(event.target.value)
        
    }
    function handleSubmit(event) {
        event.preventDefault()
        handleSearch(search)
        setSearch("")
    }
    const placeholder = `Search`
    const id = `search`
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={id}>
                <span>Search for {resource}</span>
            </label>
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                name="title"
                value={search}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar