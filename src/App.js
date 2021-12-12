import React from 'react';
import IndexHome from './pages/IndexHome';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Painel from './pages/Painel';
import { ProviderContextAdm } from './context/ContextAdm';
import { ProviderContexCLanches } from './context/ContextCardapioLanches';
import { ProviderToken } from './context/ContextToken';
import { ProviderLogin } from './context/ContextLogin';

function App() {
  return (
    <>
      <ProviderToken>
        <ProviderLogin>
          <ProviderContextAdm>
            <ProviderContexCLanches>
              <Router>
                <Switch>
                  <Route path="/" exact component={IndexHome}></Route>
                  <Route path="/panel-adm" component={Login}></Route>
                  <Route path="/panel" component={Painel}></Route>
                </Switch>
              </Router>
            </ProviderContexCLanches>
          </ProviderContextAdm>
        </ProviderLogin>
      </ProviderToken>
      
    </>
  );
}
export default App