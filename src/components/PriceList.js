import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const PriceList = ({ items, onModifyItem, onDeleteItem}) => {
  return (
    <ul className="price-ul">
      {
        items.map((item) => (
          <li className="price-li" key={item.id}>
            <div className="price-div price-img">
              <Ionicon icon={item.category.iconName} fontSize="30px" color="#474a5f" />
            </div>
            <div className="price-div price-t">
              <div className="price-tit">{item.title}</div>
              <div className="price-date">{item.date}</div>
            </div>
            <div className="price-div price-i">
              {(item.category.type === 'income') ? '+' : '-'}
              {item.price}元
            </div>
            <div className="price-div price-icon" onClick={() => {onDeleteItem(item)}}>
              <Ionicon icon="ios-trash" fontSize="20px" color="#333"/>  
            </div>
            <div className="price-div price-icon" onClick={() => {onModifyItem(item)}}>
              <Ionicon icon="md-create" fontSize="20px" color="#333"/>  
            </div>
          </li>
        ))
      }
    </ul>
  )
}

// 属性检查
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
}

export default PriceList
