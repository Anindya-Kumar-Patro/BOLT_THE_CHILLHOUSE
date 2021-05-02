import React,{useState,useEffect,useContext} from 'react'
import './SubscribeUserPost.css'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const SubscribeUserPost = () => {
    const {state,dispatch} = useContext(UserContext)
    const [data,setData] = useState([]);
    useEffect(() =>{
        fetch('/getsubpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            setData(result.posts)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const LikePost = (id) => {
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const NewData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(NewData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const UnlikePost = (id) => {
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const NewData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(NewData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const MakeComment = (text,postId) =>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const NewData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(NewData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <>
        <div className="home-body">
        <div className="home">
           {data.map((item) =>{
                return(
                    <div className="card home-card" key={item._id} >
                <h5><Link to={item.postedBy._id != state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link> {item.postedBy._id == state._id && <i className="material-icons" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>}</h5> 
                <div className="card-image">
                    <img src={item.photo} alt="post"/> 
                </div>
                <div className="card-content">
                <i className="material-icons heart">favorite</i>
                {item.likes.includes(state._id)
                ?<i className="material-icons" onClick={()=>{UnlikePost(item._id)}}>thumb_down</i>
                :<i className="material-icons" onClick={()=>{LikePost(item._id)}}>thumb_up</i> 
                }
                
                
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>

                    {
                        item.comments.map(record=>{
                            return(
                                <h6 key={record._id}><span style={{fontWeight:"bold" , paddingRight:"10px"}}>{record.postedBy.name} ::</span>{record.text}</h6>
                            )
                        })
                    }

                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        MakeComment(e.target[0].value,item._id)
                    }}>
                    <input type="text" placeholder="add a comment"/>
                    </form> 

                </div>
            </div>
                )


           })}
            
            </div>
        </div>
       
        </>
    )
}

export default SubscribeUserPost
