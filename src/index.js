//import 'bootstrap/scss/bootstrap.scss'
//import 'font-awesome/scss/font-awesome.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Application from './containers/Application'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Application)

if (module.hot) {
  module.hot.accept('./containers/Application', () => { render(Application) })
}
