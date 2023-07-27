/* Instruments */
import { counterSlice, boardSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  board: boardSlice.reducer
}
