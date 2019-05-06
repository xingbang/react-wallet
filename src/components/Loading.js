import React from 'react'
import Ionicon from 'react-ionicons'

const Loading = () => {
  return (
    <div className="loading">
      <Ionicon icon="ios-refresh" fontSize="60px" color="#f5a623" rotate={true}/>
      <h5>加载中</h5>
    </div>
  )
}

export default Loading
