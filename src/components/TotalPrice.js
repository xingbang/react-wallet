import React from 'react'
// import PropTypes from 'prop-types'

const TotalPrice = ( { income, outcome} ) => {
  return (
    <div className="total">
      <div className="total-li">
        <div className="total-tit">收入</div>
        <div className="total-div total-in"><span>{income}元</span></div>
      </div>
      <div className="total-li">
        <div className="total-tit">支出</div>
        <div className="total-div total-out"><span>{outcome}元</span></div>
      </div>
    </div>
  )
}

export default TotalPrice
