import React, { Component } from 'react';
import { observer } from "mobx-react"
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import { userStore } from "./store"
import logo from './logo.svg';
import './App.css';

import Login from "./components/Login"
import UserMenu from "./components/UserMenu"
import Home from "./components/Home"
import Albums from "./components/Albums"
import Album from "./components/Album"
// import Account from "./components/Account"

@observer
class App extends Component {

  state = {
    currentPath: this.getPath()
  }

  getPath() {
    return window.location.hash.slice(1)
  }

  componentDidMount() {
    window.addEventListener("hashchange", e => {
      console.log(this.getPath())
      this.setState({
        currentPath: this.getPath()
      })
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul className="App-menu">
              <li>
                <Link className={
                  this.state.currentPath === "/" ? "App-link active" : "App-link"
                } to="/">首页</Link>
              </li>
              {userStore.user ? (
                <li><Link className={
                  this.state.currentPath.slice(0, 7) === "/albums" ? "App-link active" : "App-link"
                } to="/albums">我的上传</Link></li>
              ) : null}
            </ul>
            <div className="App-user">
              {userStore.user ? (<UserMenu />) : (<Login />)}
            </div>
          </header>

          <Switch>
            <Route path="/" exact component={Home}></Route>
            {userStore.user && (<Route path="/albums" exact component={Albums}></Route>)}
            {userStore.user && (<Route path="/albums/:id" exact component={Album}></Route>)}
            {/* {userStore.user && (<Route path="/account" exact component={Account}></Route>)} */}
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
