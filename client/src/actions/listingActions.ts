import { createSlice } from '@reduxjs/toolkit'
import { ListingType } from '../types'

type ListingStateType = {
  items: ListingType[],
  editItem: ListingType | null,  
}

const initialState: ListingStateType = {
  items: [],
  editItem: null,
}

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setEditItem: (state, action) => {
      state.editItem = action.payload
    },
    deleteItem: (state, action) => {
      const itemId = action.payload as number
      const arr = [...state.items]
      const index = state.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        arr.splice(index, 1)
        state.items = arr
      }
    },
    updateItem: (state, action) => {
      const updatedListing = action.payload as ListingType
      const arr = [...state.items]
      const index = state.items.findIndex(item => item.id === updatedListing.id)
      if (index > -1) {
        arr[index] = updatedListing
        state.items = arr
      }
    },
  },
})

export const { setItems, setEditItem, updateItem, deleteItem } = listingSlice.actions

export default listingSlice.reducer

