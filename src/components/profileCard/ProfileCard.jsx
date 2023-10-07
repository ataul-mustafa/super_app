import React from 'react';
import './ProfileCard.css'
import profileImage from '../images/image 14.png'


function ProfileCard({userInfo}) {
    return (
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
                            (userInfo.categories).map((item, index) => (
                                <button key={index}>{item.title}</button>
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProfileCard;