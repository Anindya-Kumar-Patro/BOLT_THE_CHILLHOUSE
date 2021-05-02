import React,{useEffect,createContext,useReducer,useContext} from 'react'
import './App.css';
import NavbarCaller from './callers/NavbarCaller';
import {BrowserRouter as Router, Route, Switch,useHistory} from 'react-router-dom';
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import UserProfile from './components/UserProfile/UserProfile';
import SubscribeUserPost from './components/SubscribeUserPost/SubscribeUserPost';
import { Profiler } from 'react';
import CreatePost from './components/CreatePost/CreatePost';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()



const Routing = () => {
  const {state,dispatch}  = useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
            <Route exact path='/'> 
              <Home/>
            </Route>
            <Route exact path='/getsubpost'> 
              <SubscribeUserPost/>
            </Route>
            <Route exact path='/createpost'> 
              <CreatePost/>
            </Route>
            <Route exact path='/aboutUs'> 
              <About/>
            </Route>
            <Route exact path='/contactUs'> 
              <Contact/>
            </Route>
            <Route exact path='/login'> 
              <Login/>
            </Route>
            <Route exact path='/profile'> 
              <Profile/>
            </Route>
            <Route path='/profile/:userid'> 
              <UserProfile/>
            </Route>
            <Route exact path='/signup'> 
              <SignUp/>
            </Route>
          </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
          <NavbarCaller/>
          <Routing/>
          
      </Router>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
