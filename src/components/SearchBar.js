import {useState} from "react"

function SearchBar({handleSearch, resource}) {
    const [search,setSearch] = useState("")

    function handleChange(event) {
       
        setSearch(event.target.value)
        handleSearch(event.target.value)
    }
    // function handleSubmit(event) {
    //     event.preventDefault()
    //     handleSearch(search)
    //     setSearch("")
    // }

    
    const placeholder = `Search`
    const id = `search`
    return (
        <form>
            <label htmlFor={id}>
                <span className="h3 mx-2">Search for {resource}:</span>
            </label>
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                name="title"
                value={search}
                onChange={handleChange}
                className="form-control-lg m-2"
            />
            
        </form>
    )
}

export default SearchBar