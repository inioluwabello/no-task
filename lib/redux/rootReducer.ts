/* Instruments */
import { pageSlice, boardSlice } from './slices'

export const reducer = {
  page: pageSlice.reducer,
  board: boardSlice.reducer
}
