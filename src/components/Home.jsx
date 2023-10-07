import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './profileCard/ProfileCard';
import WetherTime from './wether&Date/WetherTime';
import News from './News/News';

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
                        <ProfileCard userInfo={userInfo} />
                        <WetherTime />
                    </section>
                    <section className="right">
                        <News />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home;