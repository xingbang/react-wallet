import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './containers/Home';
import Create from './containers/Create';
import { IndexContext } from './IndexContext'
import { flatternArr, ID, parseToYearAndMonth } from './utility'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth()
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }
    this.actions = {
      // 初始化数据
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
        return { items, categories }
      }),
      // 添加--初始化数据
      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state
        let promiseArr = []
        // 添加或修改点进来，不请求数据(刷新页面，请求数据)
        // 消费种类
        // 枚举Object.keys(categories) [1, 2, 3]
        if(Object.keys(categories).length === 0){
          // 刷新页面，请求种类
          promiseArr.push(axios.get('/categories'))
        }
        // 有消费类型时
        const itemAlreadyFeched = !!(Object.keys(items).indexOf(id) > -1)
        if (id && !itemAlreadyFeched) {
          // 刷新页面，请求消费数据
          const getURLWithId = `/items/${id}`
          promiseArr.push(axios.get(getURLWithId))
        }
        //console.log(await Promise.all(promiseArr))
        // 刷新后，拿到重新请求种类，与消费类型的值
        const [ fetchCategories, editItem ] = await Promise.all(promiseArr)
        const finalCategories = fetchCategories ? flatternArr(fetchCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if (id) {
          this.setState({
            items: {...this.state.items, [id]: finalItem}, // 后面的是刷新后重新赋值[id], 刷新后, state是没有值的
            categories: finalCategories,
            isLoading: false
          })
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false
          })
        }
        return {
          categories: finalCategories,
          editItem: finalItem
        }
      }),
      // 选择月份
      selectNewMonth: withLoading(async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: {year, month},
          isLoading: false
        })
        return items
      }),
      // 删除
      delateItem: withLoading(async (item) => {
        const delateItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading: false
        })
        return delateItem
      }),
      // 创建
      createItem: withLoading(async (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', { ...data, id: newId, cid: categoryId })
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false
        })
        return newItem.data
      }),
      // 更新
      updateItem: withLoading(async (item, updatedCategoryId) => {
        const updateData = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        }
        const modifedItem = await axios.put(`/items/${updateData.id}`, updateData)
        this.setState({
          items: { ...this.state.items, [updateData.id]: updateData },
          isLoading: false
        })
        return modifedItem.data
      })
    }
  }
  render() {
    return (
      <IndexContext.Provider value={{state: this.state, actions: this.actions}}>
        <Router>
          <Route path="/" exact component={Home}/>
          <Route path="/create" exact component={Create}/>
          <Route path="/edit/:id" exact component={Create}/>
        </Router>
      </IndexContext.Provider>
    )
  }
}

export default App;
