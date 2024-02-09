import { SearchResult } from './SearchResult';
import './SearchResultList.css'

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
    results: User[];
  };

  const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
    return (
      <div className='results-list'>
          {results.map((result, id: number) => {
              return <SearchResult result={result} key={id} />
          })}
      </div>
    );
  };

export default SearchResultsList
