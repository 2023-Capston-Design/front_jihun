import React, { useState} from "react";
import axios from "axios";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        axios.post("http://localhost:3000/v1/auth/login", {
            "email": `${email}`,
            "password": `${password}`
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.accessToken);
            console.log(response.data.refreshToken);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <h2>로그인</h2>
            <div>
                <label>email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={login}>로그인</button>
        </div>
    )
}