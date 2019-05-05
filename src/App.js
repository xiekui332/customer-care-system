import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Home from './pages/home'
import { Globalstyle } from './style'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Globalstyle></Globalstyle>
        <Home></Home>
      </div>
    </Provider>
  );
}

export default App;
