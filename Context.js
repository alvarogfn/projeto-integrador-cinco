import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const storage = {};

  return (
    <UserContext.Provider value={storage}>{children}</UserContext.Provider>
  );
};
