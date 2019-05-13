import React, {Fragment } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { Route, HashRouter  } from 'react-router-dom'
import Home from './pages/home'
import Message from './pages/message'
import Mine from './pages/mine'
import Login from './pages/login'
import { Globalstyle } from './style'

function App() {
  // class App extends PureComponent{
    // render() {
      return (
        <Provider store={store}>
          <HashRouter>
            <div className="App">
              <Globalstyle></Globalstyle>
              {
                <Fragment>
                  <Route path="/" exact component={Home} ></Route>
                  <Route path="/message" exact component={Message} ></Route>
                  <Route path="/mine" exact component={Mine} ></Route>
                  <Route path="/login" exact component={Login} ></Route>
                </Fragment>
              }
            </div>
          </HashRouter>
        </Provider>
      );
    // }
    
// }
}

export default App;
