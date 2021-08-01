import axios from "axios";
import React, { useReducer } from "react";
import { ImageReducer } from "./ImageReducer";

const initialState = {
  loading: true,
  images: [],
  error: false,
  termChanged:false
};
export const imageContext = React.createContext(initialState);

export const ImageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ImageReducer, initialState);
  const getImages = async (keyword) => {
    const url = `https://pixabay.com/api/?key=22557617-9be25417ac6dadfd2a8808c0c&q=${keyword}`;
    const res = await axios.get(url);
    const result = await res.data.hits;
    let images = [];
    images = result.map((item) => item);
    dispatch({ type: "GET_IMAGES", payload: images });
  };
  return (
    <imageContext.Provider
      value={{
        images: state.images,
        error: state.error,
        loading: state.loading,
        termChanged:state.termChanged,
        getImages,
        dispatch
      }}>
      {children}
    </imageContext.Provider>
  );
};
