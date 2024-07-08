import React, { createContext, useCallback,  useState } from 'react';

export const categoriesContext=createContext(null)

const CategoriesContextProvider = ({children}) => {
    const [categoriesArr,setCategoriesArr]=useState(null)
   
  
    return (
        <categoriesContext.Provider value={{categoriesArr}}>
                    {children}
        </categoriesContext.Provider>
    );
};

export default CategoriesContextProvider;