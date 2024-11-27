import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const url = 'https://www.course-api.com/react-useReducer-cart-project';
export const getCartItems=createAsyncThunk('cart/getCartItems',()=>{
  return fetch(url)
         .then((resp)=>resp.json())
         .catch((error)=>console.log(error));
})
const initialState={
  cartItems:[],
  amount:0,
  total:0,
  isLoading:true,
}
const cartSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
    clearCart:(state)=>{
      state.cartItems=[];
    },
    removeItem:(state,action)=>{
        console.log(action);
        const newCartItems=state.cartItems.filter((item)=>item.id!==action.payload.id);
        state.cartItems=newCartItems;
    },
    increase:(state,action)=>{
      const newItem=state.cartItems.find((item)=>item.id===action.payload.id);
      console.log(newItem)
      newItem.amount+=1;
    },
    decrease:(state,action)=>{
      
      const newItem=state.cartItems.find((item)=>item.id===action.payload.id);
      newItem.amount-=1;
    },
    calculateTotals:(state)=>{
      let amount=0,total=0;
      if(state.cartItems.length!==0)
      {
      state.cartItems.forEach((item)=>{
        amount+=item.amount;
        total+=item.amount*item.price;
      })
      state.amount=amount;
      state.total=total.toFixed(2);
    }
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
})
export const {clearCart,removeItem,increase,decrease,calculateTotals} =cartSlice.actions;
export default cartSlice.reducer;