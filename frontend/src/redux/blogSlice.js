// import {createSlice} from "@reduxjs/toolkit"
// // import { setLoading } from "./authSlice";

// const blogSlice = createSlice({
//     name:"blog",
//     initialState:{
//         loading:false,
//         blog:[]
//     },
//     reducers:{
//         //actions
//         setLoading:(state, action) => {
//             state.loading = action.payload;
            
//         },
//         setBlog:(state, action) => {
//             state.Blog = action.payload;
//         }

//     }
// });

// export const {setLoading, setBlog} = blogSlice.actions;
// export default blogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    loading: false,
  },
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
