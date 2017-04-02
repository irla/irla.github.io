import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Layout from './containers/Layout'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Layout)

if (module.hot) {
  module.hot.accept('./containers/Layout', () => { render(Layout) })
}
