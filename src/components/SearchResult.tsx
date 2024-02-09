import './SearchResult.css'

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

type SearchResultsListProps = {
    result: User;
  };

export const SearchResult: React.FC<SearchResultsListProps> = ({ result }) => {
    return (
      <div className='search-result' onClick={() => alert(`You just clicked on ${result.name}`)} >{result.name}</div>
    );
  };
