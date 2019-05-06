import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { Colors } from '../utility'

class CategorySelect extends React.Component {
  selectCategory = (e, category) => {
    this.props.onSelectCategory(category)
    e.preventDefault()
  }

  render() {
    const { categories, selectedCategory } = this.props
    const selectedCategoryId = selectedCategory && selectedCategory.id
    return(
      <div className="categoty">
        <div className="categoty-select">
          {
            categories.map((category, index) => {
              const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
              const backColor = (category.id === selectedCategoryId) ? Colors.yellow : Colors.lightGray
              const textColor = (category.id === selectedCategoryId) ? Colors.yellow : Colors.gray
              const activeClassName = (category.id === selectedCategoryId) ? 'category-item active' : 'category-item'
              return (
                <div className={activeClassName} key={index} style={{textAlign: 'center'}} onClick={(e) => {this.selectCategory(e, category)}}>
                  <Ionicon 
                    className="rounded-circle" 
                    style={{backgroundColor: backColor,padding: '5px'}} 
                    fontSize="50px" 
                    color={iconColor} 
                    icon={category.iconName}
                  />
                  <p style={{color:textColor}}>{category.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired
}

export default CategorySelect
