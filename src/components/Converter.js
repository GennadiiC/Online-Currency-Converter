import { useEffect, useState } from "react"
import { useGetConvertQuery } from "../redux/forexApi"
import { 
  setFirstAmount, 
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency,
  euro,
  usd,
  pound,
  hryvnia,
  coins, 
  arrows
} from "../redux/forexSlice"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";


export const Converter = () => {

  const dispatch = useDispatch()
  const { inputState, convertState } = useSelector(state => state.forex)

  // icon, dynamically displayed near currency name state
  const [firstIcon, setFirstIcon] = useState(coins)
  const [secondIcon, setSecondIcon] = useState(coins)

  const { 
    register,  
    setValue, 
    watch
  } = useForm({})

  // coversion rtk query hook
  const { 
    data: convertData, 
    isSuccess: convertSuccess
  } = useGetConvertQuery([convertState.firstBase, convertState.secondBase, convertState.amount])
  
  // variables displayed inside input fields
  let firstAmount
  let secondAmount
  
  if (convertSuccess && inputState.firstAmount === convertState.amount) {
    firstAmount = convertState.amount 
    secondAmount = convertData.result
  } else if (convertSuccess && inputState.secondAmount === convertState.amount) {
    firstAmount = convertData.result 
    secondAmount = convertState.amount
  } 


  // method for icons' dynamically rendered near to currency select boxes
  const iconDisplay = (inp) => {
    if (inp === '') {
      return coins
    } else if (inp === 'EUR') { 
      return euro
    } else if (inp === 'USD') {
      return usd
    } else if (inp === 'GBP') {
      return pound
    } else if (inp === 'UAH') {
      return hryvnia
    }
  }

  // effects for setting input values 
  useEffect(() => {
    setValue(
      'firstAmount', 
      convertState.amount === inputState.firstAmount ? 
      watch('firstAmount') : 
      secondAmount === '' && convertState.amount === '' ?
      '' : 
      firstAmount 
    )
  }, [firstAmount])

  useEffect(() => {
    setValue(
      'secondAmount', 
      convertState.amount === inputState.secondAmount ? 
      watch('secondAmount') : 
      firstAmount === '' && convertState.amount === '' ?
      '' :
      secondAmount
    )
  }, [secondAmount])


  return (
    <div>
      <div className="d-flex resp">
        <div className="input-group">
          <span className="input-group-text">{firstIcon}</span>
          <select 
            {...register('firstCurrency', {
              onChange: () => {
                dispatch(setFirstCurrency(watch('firstCurrency')))
                setFirstIcon(iconDisplay(watch('firstCurrency')))
              }
            })}
            className="form-select" 
            size='1'
          >
            <option label='Currency'></option>
            <option value='EUR'>Euro</option>
            <option value='USD'>US Dollar</option>
            <option value='GBP'>Great Britain Pound</option>
            <option value='UAH'>Ukrainian Hryvnia</option>
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
          <span className="input-group-text">{secondIcon}</span>
          <select 
            {...register('secondCurrency', {
              onChange: () => {
                dispatch(setSecondCurrency(watch('secondCurrency')))
                setSecondIcon(iconDisplay(watch('secondCurrency')))
              }
            })}
            className="form-select" 
          >
            <option label='Currency'></option>
            <option value='EUR'>Euro</option>
            <option value='USD'>US Dollar</option>
            <option value='GBP'>Great Britain Pound</option>
            <option value='UAH'>Ukrainian Hryvnia</option>
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