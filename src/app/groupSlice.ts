import { UserModelType } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : UserModelType[] = []

const groupSlice = createSlice({
    name:'groupchat',
    initialState,
    reducers:{
        addMember: (state: UserModelType[], action : PayloadAction<UserModelType>) => {
            state.push(action.payload)
        },
        removeMember: (state: UserModelType[], action : PayloadAction<any>) => {
            const removeIndex = state.findIndex((user) => user._id === action.payload)
            state.splice(removeIndex,1)
        },
        resetMember: (state: UserModelType[]) => {
            state.splice(0,state.length)
        }
    }
})

export const { addMember, removeMember, resetMember} = groupSlice.actions
export default groupSlice.reducer