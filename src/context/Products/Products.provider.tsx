import React, { createContext, useReducer } from "react";
import { backendUrl } from "../../config";
import { ProductsReducer } from "./Product.reducer";

export interface ProductStateType {
  products: any[];
  loading: boolean;
  companies: string[];
}

export const initialState: ProductStateType = {
  products: [],
  loading: true,
  companies: [],
};

const ProductsContext = createContext(initialState);
export default ProductsContext;

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getAllProducts = async () => {
    dispatch({ type: "LOADING" });
    await fetch(`${backendUrl}/item`)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        dispatch({ type: "GET_ALL_PRODUCTS", payload: res.items });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const addProduct = async (data: any) => {
    dispatch({ type: "LOADING" });
    await fetch(`${backendUrl}/item/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        dispatch({ type: "ADD_PRODUCT", payload: res.item });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getCompanies = async () => {
    dispatch({ type: "LOADING" });
    await fetch(`${backendUrl}/item/companies`)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        dispatch({ type: "GET_COMPANIES", payload: res.companies });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getAllProducts,
        addProduct,
        getCompanies,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
