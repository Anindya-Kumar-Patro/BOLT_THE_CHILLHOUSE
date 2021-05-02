import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import './Profile.css'

const Profile = () => {
    const [pics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setPics(data.myposts)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <>
        <div className="profile-box">
            <div className="profile-area">

                <div>
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGfVj1bd1CuFQ/profile-displayphoto-shrink_400_400/0/1604477221178?e=1625097600&v=beta&t=bztYhvLToLHyxx6ilzUcMfPyEUiRCGC3QuIkamrd5L0" alt="profile pic" className="profile-image"/>
                </div>
                <div className="profile-data">
                    <h4>{state?state.name:"loading"}</h4>
                    <div className="follow-data">
                        <h6>{pics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} follower</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                    
                </div>
            </div>
           
            <div className="gallery">

                {
                    pics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>

                        )
                    })
                }

            </div>
        </div>
        </>
    )
}

export default Profile
