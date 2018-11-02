import {createSlice} from '@reduxjs/toolkit';

//setting initail state
const initialState = {
    //product: null,
    products: null,
    error: null,
    loading: null,
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
};


const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers:{
        CreateStart: (state)=>{
            state.loading = true
          },
          CreateSuccess: (state, action)=>{
              state.products = action.payload,
              state.loading = true,
              state.error = null
          },
          CreateFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          GetProductStart: (state)=>{
            state.loading = true
          },
          GetProductSuccess: (state, action)=>{
              state.products = action.payload,
              state.loading = true,
              state.error = null
          },
          GetProductFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
    }
});

export const {
  CreateFailure,
  CreateStart,
  CreateSuccess,
  GetProductFailure,
  GetProductStart,
  GetProductSuccess   
} = productSlice.actions;

export default productSlice.reducer;


