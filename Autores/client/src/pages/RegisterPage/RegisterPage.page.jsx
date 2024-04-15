import { Link } from 'react-router-dom';
import RegisterForm from "../../components/RegisterForm/RegisterForm.component";

const RegisterPage = (props) => {
    return <div>
        <RegisterForm />
        <p>Back to <Link to={"/login"}>Login</Link></p>
    </div>
}

export default RegisterPage;