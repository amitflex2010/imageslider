export const ImageReducer = (state, action) => {
  switch (action.type) {
    case "GET_IMAGES":
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case "QUERY_CHANGED":  
    return {
      ...state, termChanged: !state.termChanged
    }
    default:
      return state;
  }
};
