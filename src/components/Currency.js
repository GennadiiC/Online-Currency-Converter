import { useSelector } from "react-redux"
import { useGetFluctationQuery } from "../redux/forexApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowTrendUp,
  faArrowTrendDown
} from '@fortawesome/free-solid-svg-icons'

export const CurrencyComponent = ({ money, icon }) => {

  const { startDate, endDate } = useSelector(state => state.forex)
  
  // fluctation rtk query hook
  const { data: fluctuation, isSuccess: fluctationSuccess, isError, error } = 
    useGetFluctationQuery([startDate, endDate, money])

  const arrowUp = <FontAwesomeIcon icon={faArrowTrendUp} className='mx-2' />
  const arrowDown = <FontAwesomeIcon icon={faArrowTrendDown} className='mx-2' />

  // conditionally rendering fluctation data to header
  if (fluctationSuccess) {
    return (
      <div className="col mx-3">
        <h4 className="h4 text-center my-4">
          {icon}
          {money}
        </h4>
        <p className="lh-base fs-5"><strong>End Rate: 1 {money} = {fluctuation.rates.UAH.end_rate} UAH</strong></p>
        <p className="lh-base fs-5"><strong><em>End Date: {fluctuation.end_date}</em></strong></p>
        <p className="mb-0 lh-sm"><small>Start Rate: 1 {money} = {fluctuation.rates.UAH.start_rate} UAH</small></p>
        <p className="mb-0 lh-sm"><small>Start Date: {fluctuation.start_date}</small></p>
        <p className="mb-0 lh-sm"><small>Change: {fluctuation.rates.UAH.change}</small></p>
        <p className="my-3 text-center"><strong>{fluctuation.rates.UAH.change_pct} % {fluctuation.rates.UAH.change > 0 ? arrowUp : arrowDown}</strong></p>
      </div>
    )
  } else if (isError) {
    return (
      <div className="container">
        <h3 className="h3">Something went wrong: {error.data.data}</h3>
      </div>
    )
  }

}