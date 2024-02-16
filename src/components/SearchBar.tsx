import { useState } from 'react';
import {FaSearch} from 'react-icons/fa'


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
    <div className='input-wrapper bg-gray-600 w-max rounded-md h-9 pl-3 pr-3 shadow-custom flex items-center'>
        <FaSearch id='search-icon' className='text-yellow-200' />
        <input className='bg-gray-600 text-yellow-100 border-none h-full text-2x1 w-max  ml-2 focus:outline-none' type="text" placeholder='Type to search..' value={input} onChange={(e) => handleChange(e.target.value) }/>

    </div>
  )
}

export default SearchBar
