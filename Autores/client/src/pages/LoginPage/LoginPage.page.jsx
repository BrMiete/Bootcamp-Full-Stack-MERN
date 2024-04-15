import { Link } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm.component";

const LoginPage = (props) => {
    return <div>
        <LoginForm />
        <p>Haven't an account yet? <Link to={"/register"}>Sign In</Link></p>
    </div>
}

export default LoginPage;
//You don't have an account yet
