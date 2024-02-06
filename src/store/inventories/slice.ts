import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type InventoryId, type Inventory } from 'src/interfaces/Inventory'

interface InitialState {
  isLoading: boolean
  data: Inventory[]
  selected: InventoryId | null
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  isLoading: false,
  data: [],
  selected: null,
  errorMessage: undefined
}

export const inventoriesSlice = createSlice({
  name: 'inventories',
  initialState: DEFAULT_STATE,
  reducers: {
    onStartInventories: (state) => {
      state.isLoading = true
    },
    loadInventories: (state, action: PayloadAction<Inventory[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    selectInventory: (state, action: PayloadAction<InventoryId>) => {
      state.selected = action.payload
      state.isLoading = false
    },
    onFinishInventories: (state) => {
      state.isLoading = false
    }
  }
})

export const { onStartInventories, loadInventories, selectInventory, onFinishInventories } = inventoriesSlice.actions
export default inventoriesSlice.reducer
