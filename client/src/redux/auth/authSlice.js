import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    currentUser: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.currentUser = null
        },
        setUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const {login, logout, setUser} = authSlice.actions
export default authSlice.reducer
