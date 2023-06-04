import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: {
        email: ''
    },
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        CreateUser: (state, action) => {
            state.user = action.payload
        },
        deletUser: (state) => {
            state.user = {
                email: ''
            }
        },
    },
    

    
})



export const { CreateUser, deletUser } = userSlice.actions
export default userSlice.reducer