import { useState } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import ContentLayout from './components/layout/layout'
import MenuLayout from './components/layout/menu'
import { persistor, store } from './store/store'



function App() {
  return (<Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <div className='w-full h-full flex bg-base-100'>
          <HashRouter>
            <MenuLayout />
            <ContentLayout />
          </HashRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App