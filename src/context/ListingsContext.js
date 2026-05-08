import { createContext, useContext } from "react";

export const ListingsContext = createContext(null)
export const useListingsContext = () => useContext(ListingsContext)