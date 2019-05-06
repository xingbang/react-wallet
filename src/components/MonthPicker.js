import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      slectYear: this.props.year
    }
  }

  toggleDropdown = (e) => {
    e.preventDefault()
    //e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  selectYear = (e, yearNumber) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      slectYear: yearNumber
    })
  }

  selectMonth = (e, monthNumber) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      isOpen: false
    })
    this.props.onChange(this.state.slectYear, monthNumber)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick = (event) => {
    this.setState({
      isOpen: false,
    })
  }
  render() {
    const {year, month} = this.props
    const {isOpen, slectYear} = this.state
    const monthNumber = range(12, 1)
    const yearRange = range(9, -4).map(number => Number(number) + Number(year))
    return (
      <div className="month">
        <div className="month-label"><Ionicon icon="ios-calendar-outline" color="#979ba7" fontSize="30px"/></div>
        <div className="month-input" onClick={this.toggleDropdown}>
          <div>{`${year} \\ ${padLeft(month)}`}</div>
        </div>
        { isOpen &&
            <div className="month-down">
              <div className="month-down-year">
                { yearRange.map((yearNumber, index) => {
                    return (
                      <div 
                        className={(Number(yearNumber) === Number(slectYear)) ? "down-li active" : "down-li" }
                        onClick={(e) => {this.selectYear(e, yearNumber)}}
                        key={index}>
                        {yearNumber}年
                      </div>
                    )
                  })
                }
              </div>
              <div className="month-down-month">
                { monthNumber.map((monthNumber, index) => {
                    return (
                      <div 
                        className={(Number(monthNumber) === Number(month)) ? "down-li active" : "down-li" } 
                        onClick={(e) => {this.selectMonth(e, monthNumber)}}
                        key={index}>
                          {padLeft(monthNumber)}月
                      </div>
                    )
                  })
                }
              </div>
            </div>
          }
      </div>
    )
  }
}

// 属性检查
MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MonthPicker
