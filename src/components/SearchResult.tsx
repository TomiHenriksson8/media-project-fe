
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
      <div className='search-result bg-gray-300 pt-2 pb-2 pl-5 pr-5 relative z-10 hover:bg-gray-400' onClick={() => alert(`You just clicked on ${result.name}`)} >{result.name}</div>
    );
  };
