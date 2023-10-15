import React, { useEffect, useState } from 'react';
import './News.css'
import newsImage from '../images/image 15.png'

// e1874ab761a6429da3c944813ce3fbc2

function News() {

    const [news, setNews] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
    })

    const setTime = (dateTime) => {
        const times = dateTime.split(':');

        let hours = (+times[0]);
        let minutes = (+times[1]);
        let amPm = "AM";

        if (hours > 12) {
            hours = hours - 12;
            amPm = "PM";
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let timing = `${hours}:${minutes} ${amPm}`;
        return timing;
    }

    const setDate = (date) => {

        const splitted = date.split('-');
        return `${splitted[1]}-${splitted[2]}-${splitted[0]}`
    }

    const fetchData = async () => {
        try {
            const api_key = 'pub_30811f65ffb19f04bc9736ddaf7dd2d196170';
            const topic = 'india'
            const data = await fetch(`https://newsdata.io/api/1/news?apikey=${api_key}&q=${topic}`)
            const jsonData = await data.json();
            const article = jsonData.results[0];

            const dateTime = article.pubDate.split(' ')

            const date = setDate(dateTime[0]);
            const time = setTime(dateTime[1]);

            setNews({
                title: article.title,
                date,
                time,
                description: article.content,
                image: article.image_url
            })
        } catch(error) {
            console.log("something went wrong", error)
        }
    }

    useEffect( () => {
        fetchData();
    }, [])
    return (
        <div className='newsSec'>
            <div className="image">
                <img src={news.image ? news.image : newsImage} alt='news section' />
                <div className="titleBar">
                    <h2>{news.title}</h2>
                    <h3>{news.date} | {news.time}</h3>
                </div>
            </div>
            <div className="desc">{news.description}</div>
        </div>
    )
}

export default News