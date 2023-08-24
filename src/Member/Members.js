import axios from 'axios';
/*회원정보 조회 컴포넌트*/
function Members() {

    function read() {
        axios.get("http://localhost:3000/v1/member", {
            params: {
                page: 1,
                pagesize: 5
            }
        }).then(function (response) {
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        });
    };


    return (
        <div>
            <button onClick={read}>회원조회</button>
        </div >
    );


}
export default Members;