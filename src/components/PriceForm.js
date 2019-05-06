import React from 'react'
import PropTypes from 'prop-types'
import { isValidDate } from '../utility'

class PriceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      validatePass: true,
      errorMessage: ''
    }
  }

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onCancelSubmit: PropTypes.func.isRequired,
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  submitForm = (e) => {
    const { item, onFormSubmit} = this.props
    const editMode = !!item.id
    const price = this.priceInput.value.trim() * 1
    const date = this.dateInput.value.trim()
    const title = this.titleInput.value.trim()
    if (price && date && title) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: '价格必须大于0'
        })
      } else if (!isValidDate(date)) {
        this.setState({
          validatePass: false,
          errorMessage: '请填写正确的日期格式'
        })
      } else {
        this.setState({
          validatePass: true,
          errorMessage: ''
        })
        // 修改还是新增
        if (editMode) {
          // 提交（传值给父组件onFormSubmit）
          // 修改
          onFormSubmit({...item, title, price, date}, editMode)
        } else {
          // 新增
          onFormSubmit({title, price, date}, editMode)
        }
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: '请输入所有必选项'
      })
    }
    e.preventDefault()
  }

  render() {
    const { title, price, date} = this.props.item
    return(
      <div className="form">
        <form onSubmit={(e) => {this.submitForm(e)}} noValidate>
          {
            !this.state.validatePass &&
            <div className="error">
              {this.state.errorMessage}
            </div>
          }
          <div className="form-group">
            <label>标题*</label>
            <input type="text" className="form-control" id="title" placeholder="请输入标题" defaultValue={title}
              ref={(input) => {this.titleInput = input}}
            />
          </div>
          <div className="form-group">
            <label>价格*</label>
            <div className="input-group input-group-price">
              <div className="input-group-prepend">
                <span className="input-group-text">￥</span>
              </div>
              <input type="number" className="form-control price" id="price" placeholder="请输入价格" defaultValue={price}
                ref={(input) => {this.priceInput = input}}
              />
            </div>
          </div>
          <div className="form-group">
            <label>日期*</label>
            <input type="date" className="form-control" id="date" placeholder="请输入日期" defaultValue={date}
              ref={(input) => {this.dateInput = input}}
            />
          </div>
          <div className="form-btn">
            <button type="submit" className="btn">提交</button>
            <button className="btn" onClick={this.props.onCancelSubmit}>返回</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PriceForm
