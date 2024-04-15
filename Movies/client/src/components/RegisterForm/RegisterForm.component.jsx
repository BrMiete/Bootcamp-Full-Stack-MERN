import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient.util";
import { useNavigate } from "react-router-dom";
import './RegisterForm.style.css';

const RegisterForm = (props) => {

    const [data, setData] = useState({});
    const [validateErrors, setValidateErrors] = useState({});
    const [foundErrors, setFoundErrors] = useState(false);
    const [emailError, setEmailError] = useState("");
    const login = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    //Validaciones del front-end
    const validate = () => {
        let flag = true;
        let error = {}

        if (data.firstName.length <= 2){
            error.firstName = "The first name must be at least 3 characters long"
            flag = false;
        }

        if (data.lastName.length <= 2){
            error.lastName = "The last name must be at least 3 characters long"
            flag = false;
        }

        if (!data.email.includes("@")){
            error.email = "The email must include a @ character"
            flag = false;
        }

        if (data.password.length <= 7){
            error.password = "The password must be at least 8 characters long"
            flag = false;
        }

        if (data.password && data.password2 && data.password !== data.password2){
            error.password2 = "Passwords must match"
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);
        console.log(data)
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.register(data)
            .then((response) => {
                //TODO
                login("/login");
            })
            .catch((error) => {
                //Validaciones del back-end
                setFoundErrors(true);
                setEmailError("The email already exists");
                console.log(error)
            })
    }

    return(
        <div className="register">
            <h1 className="register-title">Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-firstName-div">
                    <label htmlFor="firstName">First Name</label>
                    {/* {validateErrors.firstName && <small>{validateErrors.firstName}</small>} */}
                    <input className="register-firstName-input"
                        id="firstName"
                        type="text" 
                        name="firstName" 
                        value={data.firstName || ""} 
                        onChange={(event) => handleChange(event)}
                        required={true}
                    />
                </div>
                <div className="register-lastName-div">
                    <label htmlFor="lastName">Last Name</label>
                    {/* {validateErrors.lastName && <small>{validateErrors.lastName}</small>} */}
                    <input className="register-lastName-input"
                        id="lastName"
                        type="text"
                        name="lastName" 
                        value={data.lastName || ""} 
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="register-email-div">
                    <label htmlFor="email">Email</label>
                    {/* {validateErrors.email && <small>{validateErrors.email}</small>} */}
                    <input className="register-email-input" 
                        id="email"
                        type="email" 
                        name="email" 
                        value={data.email || ""} 
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="register-password-div">
                    <label htmlFor="password">Password</label>
                    {/* {validateErrors.password && <small>{validateErrors.password}</small>} */}
                    <input className="register-password-input"
                        id="password"
                        type="password" 
                        name="password" 
                        value={data.password || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                </div>
                <div className="register-password2-div">
                    <label htmlFor="password2">Confirm Password</label>
                    {/* {validateErrors.password2 && <small>{validateErrors.password2}</small>} */}
                    <input className="register-password2-input"
                        id="password2"
                        type="password" 
                        name="password2" 
                        value={data.password2 || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                </div>
                <div>
                    <button className="register-btn" type="submit">Submit</button>
                </div>
            </form>
            <div className="errors">
                {/* Validaciones del front-end */}
                {validateErrors.firstName && <p>*{validateErrors.firstName}</p>}
                {validateErrors.lastName && <p>*{validateErrors.lastName}</p>}
                {validateErrors.email && <p>*{validateErrors.email}</p>}
                {validateErrors.password && <p>*{validateErrors.password}</p>}
                {validateErrors.password2 && <p>*{validateErrors.password2}</p>}
                {/* Validaciones del back-end */}
                {foundErrors && <p>*{emailError}</p>}
            </div>
        </div>
    );
}

export default RegisterForm;