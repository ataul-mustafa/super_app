import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './profileCard/ProfileCard';
import WetherTime from './wether&Date/WetherTime';
import News from './News/News';
import Timer from './timer/Timer';
import NoteKeeper from './NoteKeeper/NoteKeeper';

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

        if (!fetchedUserInfo) {
            navigate("/signup");
        } else if (!fetchedUserCate) {
            navigate('/categories')
        }


        setUserInfo({ profileInfo: fetchedUserInfo, categories: fetchedUserCate });
    }, [navigate]);

    const clickBrowse = () =>{
        navigate('/entertainment')
    }

    return (
        <div className='homeContainer'>
            <div className="centerBox">
                <div className="homeWrapper">
                    <section className="left">
                        <div className="upper">
                            <div className="prfl">
                                <ProfileCard userInfo={userInfo} />
                                <WetherTime />
                            </div>
                            <div className="keeper">
                                <NoteKeeper />
                            </div>
                        </div>
                        <div className="lower">
                            <Timer />
                        </div>
                    </section>
                    <section className="right">
                        <News />
                    </section>
                </div>
            </div>
            <button onClick={clickBrowse}>Browse</button>
        </div>
    )
}

export default Home;