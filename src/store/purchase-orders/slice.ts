import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type PurchaseOrder } from 'src/services/purchases/transform'

interface InitialState {
  isLoading: boolean
  data: PurchaseOrder[]
  selected: PurchaseOrder | null
  isSign: boolean
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  selected: null,
  isSign: false
}

export const purchaseOrdersSlices = createSlice({
  name: 'purchaseOrders',
  initialState,
  reducers: {
    onStartPurchaseOrders: (state) => {
      state.isLoading = true
    },
    loadPurchaseOrders: (state, action: PayloadAction<PurchaseOrder[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    selectPurchaseOrder: (state, action: PayloadAction<PurchaseOrder | null>) => {
      state.selected = action.payload
      state.isLoading = false
    },
    cleanPurchaseOrder: (state) => {
      state.selected = null
    }

  }
})

export const { onStartPurchaseOrders, loadPurchaseOrders, selectPurchaseOrder, cleanPurchaseOrder } = purchaseOrdersSlices.actions

export default purchaseOrdersSlices.reducer
