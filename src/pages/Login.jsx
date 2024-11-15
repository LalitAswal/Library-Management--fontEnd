import React, {useState} from "react";


const Login = () => {

    const [userName, setUserName] = useState('Enter user name');
    const [password, setPassword] = useState('Enter password');

return (
    <>
    <form action="" method="post">
        <input type="text" />
        <input type="text" />
        <button>Submit</button>
        <a href="">Registration</a>
    </form>
    </>

)

}

export default Login;