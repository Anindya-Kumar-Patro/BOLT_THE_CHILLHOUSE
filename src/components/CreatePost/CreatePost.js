import React,{useState,useEffect} from 'react'
import './CreatePost.css'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url  
                })
            }).then(res=>res.json())
            .then(data =>{
                
                if(data.err){
                    M.toast({html: data.err})
                }
                else{
                    
                    M.toast({html: "Post Created Sucessfully"})
                    history.push('/')
                }
                
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const PostData = () =>{
        console.log(image)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","bolt-the-chillhouse")
        data.append("cloud_name","bolt-the-chillhouse")
        fetch("https://api.cloudinary.com/v1_1/bolt-the-chillhouse/image/upload",{
            method:"post",
            body:data
        }).then(res => res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(err=>{
            console.log(err)
        })

        
    }
    

    return (
        <div className="createpost-page">
            <div className="card input-field">

                <input 
                type="text" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="title" />

                <input 
                type="text" 
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                placeholder="body" />
                <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default CreatePost
