import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to access the context
export const useSearch = () => {
    return useContext(SearchContext);
};
