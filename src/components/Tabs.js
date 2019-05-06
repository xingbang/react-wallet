import React from 'react'
import PropTypes from 'prop-types'

export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.activeIndex
    }
  }
  // tab切换（切换tab的index, 并把index传给父组件）
  tabChange = (e, index) => {
    e.preventDefault()
    this.setState({
      activeIndex: index
    })
    this.props.onTabChange(index)
  }

  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    return(
      <ul className="view-tab clear">
        {
          // React.Children.map获取所有子元素的内容,函数、对象或者任何东西作为children传递
          React.Children.map(children, (child, index) => {
            //console.log(children)
            const activeClassName = (activeIndex === index) ? 'active view-tab-div' : 'view-tab-div'
            return(
              <li>
                <div onClick={(e) => {this.tabChange(e, index)}} className={activeClassName}>
                  {child}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export const Tab = ({children}) => {
  return(
    <React.Fragment>{children}</React.Fragment>
  )
}
