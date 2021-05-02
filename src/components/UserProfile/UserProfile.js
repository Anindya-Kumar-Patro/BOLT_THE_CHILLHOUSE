import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import './UserProfile.css'
import {useParams} from 'react-router-dom'

const UserProfile = () => {
    
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowfollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
          
             setProfile(result)
             console.log(userProfile)
        })
     },[])

     
    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
            })
            setShowfollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowfollow(true)
             
        })

    }

    return (
        <>
        
        <div className="profile-box">
        {
            userProfile? <>
             <div className="profile-area">

            <div>
                <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGfVj1bd1CuFQ/profile-displayphoto-shrink_400_400/0/1604477221178?e=1625097600&v=beta&t=bztYhvLToLHyxx6ilzUcMfPyEUiRCGC3QuIkamrd5L0" alt="profile pic" className="profile-image"/>
            </div>
            <div className="profile-data">
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>

                <div className="follow-data">
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>{userProfile.user.followers.length} followers</h6>
                    <h6>{userProfile.user.following.length} following</h6>
                </div>
             
                <div>
                {
                    showfollow ?
                    <button onClick={()=>followUser()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
                        Follow
                    </button>
                    :
                    <button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    Unfollow
                    </button>

                }
               
                </div>
            </div>
        </div> 
       
         <div className="gallery">

            {
                userProfile.posts.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>

                    )
                })
            }

        </div> 
        </>
        :<h2>loading....</h2>
        }
        </div>
        </>
    )
}

export default UserProfile
