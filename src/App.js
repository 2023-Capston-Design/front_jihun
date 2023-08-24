import React from 'react';
import Signup from './Member/Signup.js'; // Signup 컴포넌트가 있는 경로에 맞게 수정
import Members from './Member/Members.js';
import Signin from './Auth/Signin.js';

function App() {
  return (
    <div>
      {/* 다른 컴포넌트들과 함께 사용 */}
      <h1>리액트 회원가입 예시</h1>
      <Signup />
      <Members />
      <Signin />
    </div>
  );
}

export default App;