import { useUserStore } from "../../../lib/userStore";
import "./userinfo.css"
const Userinfo = () => {

    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    return (
        <div className="userinfo">
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="avatar" />
                <h2> {currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" />
                <img src="./edit.png" />
            </div>
        </div>
    )
}

export default Userinfo
