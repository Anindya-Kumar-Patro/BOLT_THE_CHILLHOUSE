import React,{useContext} from 'react'
import './Navbar.css'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'

const Navbar = ({show}) => {

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = () => {
        if(state){
            return[
                <li>
                    <Link to="/"> 
                        Home
                    </Link>
                </li>,
                <li>
                <Link to="/profile"> 
                    Profile
                </Link>
                </li>,
                <li>
                  <Link to="/createpost"> 
                      Create Post
                  </Link>
              </li>,
                <li>
                  <button onClick={()=>{
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/login')
                  }} 
                  className="btn waves-effect waves-light #64b5f6 blue darken-1">
                        Logout
                  </button>
              </li>
              

            ]
        }else{
            return [
                
                <li>
                <Link to="/login"> 
                    Login
                </Link>
                </li>,
                <li>
                    <Link to="/signup"> 
                        Sign Up
                    </Link>
                </li>
            ]
        }
    }

    return (
        <>
        <div className={show?"Navbar active":"Navbar"}>
            <ul>
               {renderList()}
            </ul>    
        </div>   
        </>
    )
}

export default Navbar
