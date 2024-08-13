import { configureStore } from '@reduxjs/toolkit'
import paymentsReducer from './payments/slice'
import authSlice from './auth/slice'
import inventoriesReducer from './inventories/slice'
import doctosReducer from './doctos/slice'
import purchaseOrdersReducer from './purchase-orders/slice'

export const store = configureStore({
  reducer: {
    payments: paymentsReducer,
    auth: authSlice,
    inventories: inventoriesReducer,
    doctos: doctosReducer,
    purchaseOrders: purchaseOrdersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
