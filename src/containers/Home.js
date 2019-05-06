import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LIST_VIEW, CHART_VIEW, TYPE_OUTCOME, TYPE_INCOME } from '../utility'
import Ionicon from 'react-ionicons'
import PriceList from '../components/PriceList'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import Loading from '../components/Loading'
import { Tabs, Tab } from '../components/Tabs'
import WithContext from '../WithContext'
import PieChart from '../components/PieChart'
const tabsText = [LIST_VIEW, CHART_VIEW]

const genrateChartDataByCategory = (items, type = TYPE_OUTCOME) => {
  let categoryMap = {}
  items.filter(item => item.category.type === type).forEach((item) => {
    if(categoryMap[item.cid]) {
      categoryMap[item.cid].value += (item.price * 1)
      categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id]
    } else {
      categoryMap[item.cid] = {
        name: item.category.name,
        value: item.price * 1,
        items: [item.id]
      }
    }
  })
  return Object.keys(categoryMap).map(mapKey => ({...categoryMap[mapKey]}))
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsText[0]
    }
  }
  componentDidMount() {
    this.props.actions.getInitalData()
  }
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  }
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
    this.setState({
      tabView: tabsText[0]
    })
  }
  modifyItem = (item) =>{
    this.props.history.push(`/edit/${item.id}`)
  }
  createItem = () => {
    this.props.history.push('/create')
  }
  deleteItem = (item) => {
    this.props.actions.delateItem(item)
  }
  render() {
    const { data } = this.props
    const { items, categories, isLoading, currentDate } = data
    const { tabView } = this.state
    const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    let totalIncome = 0, totalOutcome = 0
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    const chartOutcomeDataByCategory = genrateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
    const chartIncomeDataByCategory = genrateChartDataByCategory(itemsWithCategory, TYPE_INCOME)

    return (
      <div className="App">
        <div className="top">
          <div className="top-tit">Wallet</div>
          <div className="top-icon">
            <Ionicon icon="ios-add" fontSize="30px" color="#fff" onClick={this.createItem}/>
          </div>
        </div>
        <TotalPrice 
          income={totalIncome}
          outcome={totalOutcome}
        />
        <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}/>
        {
          isLoading &&
          <Loading />
        }
        {!isLoading &&
          <React.Fragment>
            <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
              <Tab>
                {/*<Ionicon className="rounded-circle" fontSize="25px" color={'#ccc'} icon="ios-paper" />*/}
                列表模式
              </Tab>
              <Tab>
                {/*<Ionicon className="rounded-circle" fontSize="25px" color={'#ccc'} icon="ios-pie" />*/}
                图标模式
              </Tab>
            </Tabs>
            {tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
              <PriceList 
                items={itemsWithCategory} 
                onModifyItem={this.modifyItem}
                onDeleteItem={this.deleteItem}
              />
            }
            {tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
              <div className="no-data">你还没有任何记账记录，何不记录一比！</div>
            }
            {tabView === CHART_VIEW &&
              <React.Fragment>
                <PieChart title="本月支出" categoryData={chartOutcomeDataByCategory} />
                <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
              </React.Fragment>
            }
          </React.Fragment>
        }
      </div>
    );
  }
}

export default withRouter(WithContext(Home))