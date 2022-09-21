import { useEffect, useState } from "react"
import { useGetConvertQuery, useGetLatestQuery } from "../redux/forexApi"
import { useGetSymbolQuery } from "../redux/symbolsApi"
import { 
  setFirstAmount, 
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency,
  coins, 
  arrows
} from "../redux/forexSlice"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";


export const Converter = () => {

  const dispatch = useDispatch()
  const { inputState, convertState } = useSelector(state => state.forex)


  // symbols queried to set icons
  const [firstSymbol, setFirstSymbol] = useState('')
  const [secondSymbol, setSecondSymbol] = useState('')

  const { 
    register,  
    setValue, 
    watch
  } = useForm()

  // coversion rtk query hook
  const { 
    data: convertData, 
    isSuccess: convertSuccess
  } = useGetConvertQuery([convertState.firstBase, convertState.secondBase, convertState.amount])

  // latest currencies available rtk query hook
  const {
    data: latestData,
    isSuccess: latestSuccess
  } = useGetLatestQuery()

  // currency symbols rtk query hooks
  const {
    data: symbolsData1,
    isSuccess: symbolsSuccess1
  } = useGetSymbolQuery(firstSymbol)

  const {
    data: symbolsData2,
    isSuccess: symbolsSuccess2
  } = useGetSymbolQuery(secondSymbol)
  
  // variables displayed inside input fields
  let firstAmount
  let secondAmount
  
  if (convertSuccess && inputState.firstAmount === convertState.amount) {
    firstAmount = convertState.amount 
    secondAmount = convertData.result
  } else if (convertSuccess && inputState.secondAmount === convertState.amount) {
    firstAmount = convertData.result 
    secondAmount = convertState.amount
  } else if (convertSuccess && inputState.firstCurrency === '') {
    firstAmount = ''
    secondAmount = ''
  } else if (convertSuccess && inputState.secondCurrency === '') {
    firstAmount = ''
    secondAmount = ''
  }


  // method for icons' dynamically rendered near to currency select boxes
  const iconDisplay = (inp) => {
    let [curr] = inp
    let ob = curr.currencies
    let [parsed] = Object.values(ob)
    return parsed.symbol
  }

  // effects for setting input values 
  useEffect(() => {
    setValue(
      'firstAmount', 
      convertState.amount === inputState.firstAmount ? 
      inputState.firstAmount : 
      secondAmount === '' && convertState.amount === '' ?
      '' : 
      firstAmount 
    )
  }, [firstAmount])

  useEffect(() => {
    setValue(
      'secondAmount', 
      convertState.amount === inputState.secondAmount ? 
      inputState.secondAmount : 
      firstAmount === '' && convertState.amount === '' ?
      '' :
      secondAmount
    )
  }, [secondAmount])
  

  return (
    <div>
      <div className="d-flex resp">
        <div className="input-group">
          <span className="input-group-text">
            {
              symbolsSuccess1 ? iconDisplay(symbolsData1) : coins
            }
          </span>
          <select 
            {...register('firstCurrency', {
              onChange: () => {
                dispatch(setFirstCurrency(watch('firstCurrency')))
                setFirstSymbol(watch('firstCurrency'))
                console.log(watch('firstCurrency'))
              }
            })}
            className="form-select" 
            size='1'
          >
            <option label='Currency'></option>
            {
              latestSuccess ?
              Object.keys(latestData.rates).map((item, i) => 
                <option key={i} value={item}>{item}</option>
              ) :
              null
            }
          </select> 
          <input 
            {...register('firstAmount', {
                onChange: () => dispatch(setFirstAmount(watch('firstAmount'))) 
              }
            )}
            disabled={watch('firstCurrency') === '' || !inputState.firstCurrency ? true : false}
            
            className="form-control" 
            placeholder="Enter amount" 
            autoComplete="off"
          /> 
        </div>
        <div className="m-2">
          {arrows}
        </div>
        <div className="input-group">
          <span className="input-group-text">
            {
              symbolsSuccess2 ? iconDisplay(symbolsData2) : coins
            }
          </span>
          <select 
            {...register('secondCurrency', {
              onChange: () => {
                dispatch(setSecondCurrency(watch('secondCurrency')))
                setSecondSymbol(watch('secondCurrency'))
              }
            })}
            className="form-select" 
          >
            <option label='Currency'></option>
            {
              latestSuccess ?
              Object.keys(latestData.rates).map((item, i) => 
                <option key={i} label={item}>{item}</option>
              ) :
              null
            }
          </select>
          <input 
            {...register('secondAmount', {
              onChange: () => dispatch(setSecondAmount(watch('secondAmount'))),
            })}
            disabled={watch('secondCurrency') === '' || !inputState.secondCurrency ? true : false}
            type="text" 
            className="form-control" 
            placeholder="Enter amount" 
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}