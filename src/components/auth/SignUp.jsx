import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();

    useEffect(() => {
        let fetchedUserInfo = JSON.parse(localStorage.getItem("userData"));

        if(fetchedUserInfo){
            console.log(fetchedUserInfo);
            navigate("/");
        } 
    
    }, [navigate]);

    let Initailerrors = {
        nameError : "",
        userNameError: "",
        emailError: "",
        mobileError: "",
        checkBoxError: ""
    };

    const signupInfo = {
        name: "",
        userName: "",
        email: "",
        mobile: "",
        checkBox: false,
    }

    const [signUpData, setSignUpData] = useState(signupInfo);
    const [error, setError] = useState(Initailerrors);

    function containsSpecialCharacters(str) {
        // Regular expression to match any character that is not a letter (a-z or A-Z) or space
        const nonAlphabeticRegex = /[^a-zA-Z\s]/;
        
        // Regular expression to match any digit
        const digitRegex = /\d/;
        
        // Check if the string contains any non-alphabetic character or digit
        return nonAlphabeticRegex.test(str) || digitRegex.test(str);
    }

    function isValidEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validation = () => {
        let errors = {...Initailerrors};
        if(signUpData.name === ""){
            errors.nameError = "Name is required";
        }else if(containsSpecialCharacters(signUpData.name)){
            errors.nameError = "Name can only have char a-z";
        }

        if(signUpData.userName === ""){
            errors.userNameError = "Username is required";
        }else if(signUpData.userName.length < 8){
            errors.userNameError = "Minimum 8 chars required";
        }

        if(signUpData.email === ""){
            errors.emailError = "Email is required";
        }else if(!isValidEmail(signUpData.email)){
            errors.emailError = "Enter a valid email";
        }

        if(signUpData.mobile === ""){
            errors.mobileError = "Mobile no. is required";
        }else if(signUpData.mobile.length !== 10){
            errors.mobileError = "Mobile no. must contain 10 digits";
        }

        if(signUpData.checkBox === false){
            errors.checkBoxError = "check the checkbox to signup"
        } else {
            errors.checkBoxError = ""
        }


        if(errors.nameError === "" && errors.userNameError === "" && errors.emailError === "" && errors.mobileError === "" && errors.checkBoxError === "" ){
            localStorage.setItem('userData', JSON.stringify({...signUpData}))
            navigate('/categories');
        } else {
            console.log(errors);
            setError(errors);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        validation();
    }

    return (
        <div className='authContainer'>
            <section className='sideImage'><h1>Discover new things on Superapp</h1></section>
            <section className='signupPage'>
                <form onSubmit={(e)=>{handleSubmit(e)}} className="signupContainer">
                    <h1>Super App</h1>
                    <h2>Create your new account</h2>
                    <div className='input'>
                        <input type="text" onChange={(e)=>{setSignUpData({...signUpData, name: e.target.value})}} placeholder='Name' />
                        <p>{error.nameError && `${error.nameError}`}</p>
                    </div>
                    <div className="input">
                        <input type="text" onChange={(e)=>{setSignUpData({...signUpData, userName: e.target.value})}} placeholder='UserName' />
                        <p>{error.userNameError && `${error.userNameError}`}</p>
                    </div>
                    <div className="input">
                        <input type="gmail" onChange={(e)=>{setSignUpData({...signUpData, email: e.target.value})}} placeholder='Email' />
                        <p>{error.emailError && `${error.emailError}`}</p>
                    </div>
                    <div className="input">
                        <input type="number" onChange={(e)=>{setSignUpData({...signUpData, mobile: e.target.value})}} placeholder='Mobile' />
                        <p>{error.mobileError && `${error.mobileError}`}</p>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" checked={signUpData.checkBox} onChange={(e)=>{setSignUpData({...signUpData, checkBox: !signUpData.checkBox})}} />
                        <span>Share my registration data with Superapp</span>
                        <p>{error.checkBoxError && `${error.checkBoxError}`}</p>
                    </div>
                    <button>SIGN UP</button>
                    <p>By clicking on Sign up. you agree to Superapp <span>Terms and Conditions of Use</span></p>
                    <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span>Privacy Policy</span></p>
                </form>
            </section>
        </div>
    )
}

export default SignUp