import { configureStore } from "@reduxjs/toolkit"
import groupSliceReducer from "@/app/groupSlice"

export const groupList = () => {
    return configureStore({
        reducer:{
            groupchat:groupSliceReducer,
        }
    })
}

export type AppStore = ReturnType<typeof groupList>
//to get thr current state
export type RootState = ReturnType<AppStore['getState']>
//to set the new state yad kro shivam
export type AppDispatch = AppStore['dispatch']