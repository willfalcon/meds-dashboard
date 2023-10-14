import React from 'react';
import HassProvider from "./HassProvider";
import AuthProvider from "./AuthProvider";
import SearchProvider from './SearchProvider';

export default function AppProvider({children}) {
  return (
    <AuthProvider>
      <HassProvider>
        <SearchProvider>
          { children }
        </SearchProvider>
      </HassProvider>
    </AuthProvider>
  );
}

