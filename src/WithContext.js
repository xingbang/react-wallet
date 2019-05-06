import React from 'react'
import { IndexContext } from './IndexContext'

const withContext = (Component) => {
  return (props) => (
    <IndexContext.Consumer>
      {({ state, actions }) => {
        return <Component {...props} data={state} actions={actions}/>
      }}
    </IndexContext.Consumer>
  )
}

export default withContext

