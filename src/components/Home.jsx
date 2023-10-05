import React, { useEffect, useState } from 'react';
import profileImage from './images/image 14.png'
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const initialUserInfo = {
        profileInfo: {},
        categories: [],
    }
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        let fetchedUserInfo = JSON.parse(localStorage.getItem("userData"));
        let fetchedUserCate = JSON.parse(localStorage.getItem("ChoosedCategories"))

        if(!fetchedUserInfo){
            navigate("/signup");
        } else if(!fetchedUserCate){
            navigate('/categories')
        }
        
    
        setUserInfo({ ...userInfo, profileInfo: fetchedUserInfo, categories: fetchedUserCate });
    }, []);

    return (
        <div className='homeContainer'>
            <div className="centerBox">
                <div className="homeWrapper">
                    <section className="left">
                        <div className="profileCard">
                            <div className="profileBox">
                                <section className="left">
                                    <img src={profileImage} alt="profile" />
                                </section>
                                <section className="right">
                                    <div className="userInfo">
                                        <h2>{userInfo.profileInfo.name}</h2>
                                        <h3>{userInfo.profileInfo.email}</h3>
                                        <h1>{userInfo.profileInfo.userName}</h1>
                                    </div>
                                    <div className="categories">
                                        {
                                            userInfo.categories &&
                                            (userInfo.categories).map((item, index)=>(
                                                <button>{item.title}</button>
                                            ))
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="weatherTime">weatherTime</div>
                    </section>
                    <section className="right">News</section>
                </div>
            </div>
        </div>
    )
}

export default Home;