import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
};


type SetResultsFunction = (results: User[]) => void;


function SearchBar({setResults}: {setResults: SetResultsFunction}) {

    const [input, setInput] = useState('');

    const fetchData = (value: string) => {
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((json) => {
            const results = json.filter((user: User) => {
                return value && user && user.name  && user.name.toLowerCase().includes(value)
            })
            setResults(results);
        })
    };


    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    }

    return (
    <div className='input-wrapper'>
        <FaSearch id='search-icon' />
        <input type="text" placeholder='Type to search..' value={input} onChange={(e) => handleChange(e.target.value) }/>

    </div>
  )
}

export default SearchBar
