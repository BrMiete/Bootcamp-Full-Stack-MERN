import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient.util";
import { useNavigate } from "react-router-dom";
import './LoginForm.style.css';

const LoginForm = (props) => {
    //errors : {name: message} donde name es el nombre de la key y message el value
    const [validateErrors, setValidateErrors] = useState({})
    const [incorrectData, setIncorrectData] = useState("");
    const [foundErrors, setFoundErrors] = useState(false);
    const [data, setData] = useState({});
    const home = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    //Validaciones del front-end
    const validate = () => {
        let flag = true;
        let error = {};

        if (data.email.length <= 9){
            error.email = "The email must be at least 10 characters long"
            flag = false;
        }

        if (data.password.length <= 7){
            error.password = "The password must be at least 8 characters long"
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.login(data.email, data.password)
            .then((response) => {
                //console.log(response.data.user.name)
                localStorage.setItem("firstName", response.data.user.name)
                setFoundErrors(false);
                home("/movies/");
            })
            .catch((error) => {
                //Validaciones del back-end
                setFoundErrors(true);
                setIncorrectData("The email or password you entered is incorrect");
                console.log(error.response.data.error)
            })
    }

    return(
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Login</h1>
                <div className="login-email-div">
                    <label htmlFor="email">Email</label>
                    {/* {validateErrors.email && <small>{validateErrors.email}</small>} */}
                    <input  className="login-email-input" 
                        id="emailLogin"
                        type="email" 
                        name="email" 
                        value={data.email || ""} 
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="login-password-div">
                    <label htmlFor="password">Password</label>
                    {/* {validateErrors.password && <small>{validateErrors.password}</small>} */}
                    <input className="login-password-input" 
                        id="passwordLogin"
                        type="password" 
                        name="password" 
                        value={data.password || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                </div>
                <div>
                    <button className="login-btn" type="submit">Log In</button>
                </div>
            </form>
            <div className="errors">
                {/* Validaciones del front-end */}
                {validateErrors.email && <p>*{validateErrors.email}</p>}
                {validateErrors.password && <p>*{validateErrors.password}</p>}
                {/* Validaciones del back-end */}
                {foundErrors && <p>*{incorrectData}</p>}
            </div>
        </div>
    );
}

export default LoginForm;