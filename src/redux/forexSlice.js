import { createSlice } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEuroSign,
  faDollarSign,
  faSterlingSign,
  faHryvniaSign,
  faCoins, 
  faRightLeft
} from '@fortawesome/free-solid-svg-icons'

// FontAwesome react icons 
export const euro = <FontAwesomeIcon icon={faEuroSign} className='mx-2' />
export const usd = <FontAwesomeIcon icon={faDollarSign} className='mx-2' />
export const pound = <FontAwesomeIcon icon={faSterlingSign} className='mx-2' />
export const hryvnia = <FontAwesomeIcon icon={faHryvniaSign} className='mx-2' />
export const coins = <FontAwesomeIcon icon={faCoins} className='mx-2' />
export const arrows = <FontAwesomeIcon icon={faRightLeft} className='mx-2' />

// hardcoded currencies object for displaying in header
export const currencies = [
  {
    money: 'EUR',
    icon: euro,
    id: 1
  },
  {
    money: 'USD',
    icon: usd,
    id: 2
  },
  {
    money: 'GBP',
    icon: pound,
    id: 3
  }
]

const forexSlice = createSlice({
  name: 'forex',
  initialState: {
    // fluctation start date state
    startDate: null,
    // fluctation end date state
    endDate: null,
    // the data received from inputs and selects (currency and amount)
    inputState: {},
    // the data used to fetch conversion and display it properly inside inputs
    convertState: {}
  },
  reducers: {
    // method for setting fluctation start date
    setStartDate: (state, action) => {
      if (state.startDate !== action.payload) {
        state.startDate = action.payload
      }
    },
    // method for setting fluctation end date
    setEndDate: (state, action) => {
      if (state.endDate !== action.payload) {
        state.endDate = action.payload
      }
    },
    // methods for setting both parts of inputState and convertState, names speak for themselves
    setFirstAmount: (state, action) => {
      state.inputState.firstAmount = action.payload
      state.convertState.amount = action.payload
      state.convertState.secondBase = state.inputState.secondCurrency
      state.convertState.firstBase = state.inputState.firstCurrency
    },
    setSecondAmount: (state, action) => {
      state.inputState.secondAmount = action.payload
      state.convertState.amount = action.payload
      state.convertState.firstBase = state.inputState.secondCurrency
      state.convertState.secondBase = state.inputState.firstCurrency
    },
    setFirstCurrency: (state, action) => {
      state.inputState.firstCurrency = action.payload !== undefined ? action.payload : ''
      if (state.convertState.amount && state.convertState.amount === state.inputState.secondAmount) {
        state.convertState.firstBase = state.inputState.secondCurrency
        state.convertState.secondBase = action.payload
        } else {
          state.convertState.firstBase = action.payload
        }
    },
    setSecondCurrency: (state, action) => {
      state.inputState.secondCurrency = action.payload !== undefined ? action.payload : ''
      if (state.convertState.amount && state.convertState.amount === state.inputState.secondAmount) {
        state.convertState.firstBase = action.payload
        state.convertState.secondBase = state.inputState.firstCurrency
      } else {
        state.convertState.secondBase = action.payload
      }
    }
  }
})

export const { 
  setStartDate, 
  setEndDate, 
  setFirstAmount, 
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency 
} = forexSlice.actions

export default forexSlice.reducer