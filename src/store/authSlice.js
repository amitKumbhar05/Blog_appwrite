import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status:false,
    Data:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.Data=action.payload
        },
        logout:(state)=>{
            state.status=false;
            state.Data=null;
        }        
    }
});

export const {login,logout} = authSlice.actions

export default authSlice.reducer