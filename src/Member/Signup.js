import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

let sexOptions = [
    { value: "male", label: "남성" },
    { value: "female", label: "여성" }
];

/*회원가입 컴포넌트 */
function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [groupId, setGroupId] = useState('');
    const [sex, setSex] = useState('');
    const [birth, setBirth] = useState('');
    const [memberRole, setMemberRole] = useState('');

    const handleSignup = () => {   //회원가입 진행
        let id = '';
        console.log(birth);
        axios.post('http://localhost:3000/v1/member', {
            "name": `${name}`,
            "password": `${password}`,
            "email": `${email}`,
            "groupId": `${groupId}`,
            "sex": `${sex}`,
            "birth": `${birth}`,
            "memberRole": `${memberRole}`
        }).then((response) => {
            console.log(response.data.id);
            id = response.data.id;
            emailAuth(id);
        }).catch((error) => {
            console.log(error);
        });
    };

    const emailAuth = (id) => {     //이메일 인증 전송
        let emailMsg = '';
        console.log('이메일 인증:'+ id);
        console.log(typeof id);
        axios.post('http://localhost:3000/v1/auth/email', {
            "id": id
        }).then((response) => {
            console.log("이메일 인증키: "+ response.data.msg);

        }).catch((error) => {
            console.log(error);
        });
    }

    const emailChk = () => {
        axios.get(`http://localhost:3000/v1/member/email/${email}`)
        .then((response) => {
            console.log(response.data);
            if (response.data.msg === true){
                alert("사용 가능한 메일입니다.");
            }
        }).catch((error) => {
            console.log(error.response.data.message);
            if (error.response.data.message === "EMAIL_ALREADY_TAKEN"){
                alert("이미 사용중인 메일입니다.");
            }else {
                alert("알 수 없는 접근입니다.");
            }
        });
    }

    const groupIdChk = () => {
        axios.get(`http://localhost:3000/v1/member/gid/${groupId}`)
        .then((response) => {
            console.log(response.data);
            if (response.data.msg === true){
                alert("사용 가능한 학번입니다.");
            }
        }).catch((error) => {
            console.log(error);
            if (error.response.data.message === "EMAIL_ALREADY_TAKEN"){
                alert("이미 사용중인 학번입니다.");
            }else {
                alert("알 수 없는 접근입니다.");
            }
        });
    }

    return (
        <div>
            <h2>회원가입</h2>
            <div>
                <label>name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={emailChk}>이메일 중복 체크</button>
            </div>
            <div>
                <label>groupId: </label>
                <input
                    type="text"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                />
                <button onClick={groupIdChk}>학번 중복 체크</button>
            </div>
            <div>
                <label>sex: </label>
                <Select
                    onChange={(e) => setSex(e.value)}
                    options={sexOptions}
                    value={sexOptions.filter((option) => {
                        return option.value === sex;
                    })}
                />
            </div>
            <div>
                <label>birth: </label>
                <input
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />
            </div>
            <div>
                <label>memberRole: </label>  
                <input
                    type="text"
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                />
            </div>
            <button onClick={handleSignup}>회원가입</button>
        </div>
    );
}
export default Signup;