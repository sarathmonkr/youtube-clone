import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);


export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = React.useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
}