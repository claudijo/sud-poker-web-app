import { configureStore } from '@reduxjs/toolkit'
import table from './slices/table-slice'
import me from './slices/me-slice';
import seatIndex from './slices/seat-index-slice'
export default configureStore({
  reducer: {
    table,
    me,
    seatIndex,
  }
})