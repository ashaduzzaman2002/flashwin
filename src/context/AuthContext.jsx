import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState('Ashadu')
 
  return <AuthContext.Provider value={{name, setName}}>{children}</AuthContext.Provider>;
};
