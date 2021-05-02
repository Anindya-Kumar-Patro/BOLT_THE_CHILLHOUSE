import React,{useState} from 'react'
import './SignUp.css'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password   
            })
        }).then(res=>res.json())
        .then(data =>{
            if(data.err){
                M.toast({html: data.err})
            }
            else{
                M.toast({html: data.message})
                history.push('/login')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        
        <>
        <div className="signup-box">
        <div className="signup-card">
            <h2>BOLT : The Chillhouse</h2>
            <input 
            type="text" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            placeholder="Name" />


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
                Sign Up
            </button>
            <h5>
                <Link className="already-have-account" to="/login">Already have an account ?</Link>
            </h5>
        </div>
        </div>
        </>
        
    )
}

export default SignUp
