import React, { useEffect, useState } from 'react';
import warningIcon from '../images/warning.png';
import './Categories.css'
import image1 from '../images/categories/image 2.jpg'
import image2 from '../images/categories/image 3.jpg'
import image3 from '../images/categories/image 4.jpg'
import image4 from '../images/categories/image 6.jpg'
import image5 from '../images/categories/image 7.jpg'
import image6 from '../images/categories/image 8.jpg'
import image7 from '../images/categories/image 9.jpg'
import image8 from '../images/categories/image 10.jpg'
import image9 from '../images/categories/image 11.jpg'
import { useNavigate } from 'react-router-dom';


function Categories() {
    const navigate = useNavigate();

    useEffect(() => {
        let fetchedUserCate = JSON.parse(localStorage.getItem("ChoosedCategories"))

        if(fetchedUserCate){
            navigate('/')
        }
        
    }, [navigate]);

    const cardData = [
        {
            id: 1,
            image: image1,
            title: "Action",
            bgColor: "#FF5209",
        },
        {
            id: 2,
            image: image2,
            title: "Drama",
            bgColor: "#D7A4FF",
        },
        {
            id: 3,
            image: image3,
            title: "Romance",
            bgColor: "#148A08",
        },
        {
            id: 4,
            image: image4,
            title: "Thriller",
            bgColor: "#84C2FF",
        },
        {
            id: 5,
            image: image5,
            title: "Western",
            bgColor: "#902500",
        },
        {
            id: 6,
            image: image6,
            title: "Horror",
            bgColor: "#7358FF",
        },
        {
            id: 7,
            image: image7,
            title: "Fantasy",
            bgColor: "#FF4ADE",
        },
        {
            id: 8,
            image: image8,
            title: "Music",
            bgColor: "#E61E32",
        },
        {
            id: 9,
            image: image9,
            title: "Fiction",
            bgColor: "#6CD061",
        },
    ]

    const [choosedCat, setChoosedCat] = useState([]);
    const [error, setError] = useState(false);

    const addHandler = (i) => {
        
        if (!isPresent(i.id)) {
            setChoosedCat([...choosedCat, i])
        } else {
            const filteredArray = removeElementFromArray(i.id);
            setChoosedCat([...filteredArray]);
        }

        if (choosedCat.length >= 2 ) {
            setError(false)
        }

    }

    const saveCategoriesInLocalStorage = () =>{
        let savedCategories = [];

        choosedCat.forEach((item, index)=>{
            savedCategories.push((item));
        })
        localStorage.setItem("ChoosedCategories", JSON.stringify(savedCategories))
    }

    const submitHandler = () => {
        if (choosedCat.length < 3) {
            setError(true);
        } else {
            setError(false)
            saveCategoriesInLocalStorage();
            navigate("/");
        }
    }

    const removeElementFromArray = (id) => {
        return choosedCat.filter(item => item.id !== id);
    }

    const handleDelete = (element) => {
        const filteredArray = removeElementFromArray(element.id);
        setChoosedCat([...filteredArray]);
    }

    function isPresent(id) {
        for (let i = 0; i < choosedCat.length; i++) {
            if (choosedCat[i].id === id) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className='cateContainer'>
            <div className="cateBox">
                <section className="left">
                    <div className='leftBox'>
                        <h1>Super app</h1>
                        <h2>Choose your entertainment category</h2>
                        <div className='cateCard'>
                            {
                                choosedCat &&
                                choosedCat.map((item, index) => (
                                    <div key={index}><h1>{item.title}</h1> <span onClick={() => handleDelete(item)}>X</span></div>
                                ))
                            }
                        </div>
                        {
                            error &&
                            <div className='warning'>
                                <img src={warningIcon} alt="warn" />
                                <span>Minimum 3 category required</span>
                            </div>
                        }
                    </div>
                </section>
                <section className="right">
                    <div className="catCardBox">
                        {
                            cardData.map((item, index) => (
                                // <CategoryCard key={index} acceptFun={acceptData} data={item} />
                                <div className='cardContainer' key={index} onClick={() => addHandler(item)} style={{ backgroundColor: item.bgColor, borderColor: isPresent(item.id) && '#11B800'}}>
                                    <h1>{item.title}</h1>
                                    <img src={item.image} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={submitHandler}>Next Page</button>
                </section>
            </div>
        </div>
    )
}

export default Categories