import React,{useState,useContext} from 'react'
import {UserContext} from '../../App'
import './Login.css'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                email:email,
                password:password   
            })
        }).then(res=>res.json())
        .then(data =>{
            console.log(data)
            if(data.err){
                M.toast({html: data.err})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signed in Sucessfully"})
                history.push('/')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
        <div className="login-box">
        <div className="login-card">
            <h2>BOLT : The Chillhouse</h2>
            <input
             type="text" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="email" />

            <input
             type="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)} 
             placeholder="password" />
            <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Login
            </button>
            <h5>
                <Link className="already-have-account" to="/signup">Don't have an account ?</Link>
            </h5>
        </div>
        </div>
        </>
    )
}

export default Login
