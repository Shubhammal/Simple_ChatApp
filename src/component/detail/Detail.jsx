
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useChatStore } from "../../lib/chatStore"
import { auth, db } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore"
import "./detail.css"

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
    const { currentUser } = useUserStore();
    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "username", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            })
            changeBlock()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || './avatar.png'} alt="" />
                <h2>{user?.username}</h2>
                <p> Lorem ispudf asdf  df s ,</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>


                <div className="option">
                    <div className="title">
                        <span>Privacy % help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>



                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">


                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://wallpapercave.com/wp/tM7GHV6.jpg" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./downlaod.png" alt="" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://wallpapercave.com/wp/tM7GHV6.jpg" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./downlaod.png" alt="" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://wallpapercave.com/wp/tM7GHV6.jpg" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./downlaod.png" alt="" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://wallpapercave.com/wp/tM7GHV6.jpg" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./downlaod.png" alt="" className="icon" />
                        </div>



                    </div>
                </div>



                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User blocked" : "Block User"
                }</button>
                <button className="logout" onClick={() => auth.signOut()}>Log out</button>
            </div>
        </div>
    )
}

export default Detail

