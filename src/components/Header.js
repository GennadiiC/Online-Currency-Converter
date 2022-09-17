import { useEffect } from "react"
import { setStartDate, setEndDate } from "../redux/forexSlice"
import { useSelector, useDispatch } from "react-redux"
import { currencies } from "../redux/forexSlice"
import { CurrencyComponent } from "./Currency"
import { Converter } from "./Converter"

export default function Header () {

  const dispatch = useDispatch()
  const { startDate, endDate } = useSelector(state => state.forex)

  // method for calculating today and yesterday dates which will be used in 
  // setting start and end date for fluctation query fetching
  function setDates () {
    let now = new Date()
    let day = now.getDate()
    let yesterday = now.getDate() - 1
    day = day.toString().length < 2 ? '0' + day : day
    yesterday = yesterday.toString().length < 2 ? '0' + yesterday : yesterday
    let month = now.getMonth()
    month = month.toString().length < 2 ? '0' + month : month
    let year = now.getFullYear()
    let today = year + '-' + month + '-' + day
    let yesterdayDate = year + '-' + month + '-' + yesterday
    dispatch(setStartDate(yesterdayDate))
    dispatch(setEndDate(today))
  }
  
  // triggering setDates method when component loads
  useEffect(() => setDates())


  return (
    <div> 
      <h1 className="h1 text-center my-5">Online Currency Converter Tool</h1> 
      <div className="row header-body mx-auto">
        {/* Conditionally rendering data displayed in header */}
        {
          startDate !== null && endDate !== null ?
          currencies.map(item => 
            <CurrencyComponent 
              key={item.id}
              money={item.money}
              icon={item.icon}
            />
          ) :
          null
        }
      <Converter />
      </div>
    </div>
  )
}