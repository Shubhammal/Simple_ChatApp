
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useChatStore } from "../../lib/chatStore"
import { auth, db } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore"
import "./detail.css"
import { useState } from "react"
import SharedPhotos from "./SharedPhotos"


const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const [optionSection , setoptionSection] = useState(false);
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
    const toggleSection =(section) =>{
        setoptionSection(optionSection === section ? null :section);
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
                    <div className="title" onClick={() => toggleSection('settings')}>
                        <span>Chat Setting</span>
                        {optionSection === 'settings' ? <img src="./arrowUp.png" alt=""/> : <img src="./arrowDown.png" alt="" />}
                    </div>
                    {optionSection === 'settings' && <div className="content">Chat settings content...</div>}
                </div>


                <div className="option">
                    <div className="title" onClick={()=> toggleSection('Privacy')}>
                        <span>Privacy % help</span>
                        {optionSection === 'Privacy' ? <img src="./arrowUp.png" alt=""/> : <img src="./arrowDown.png" alt="" />}
                    </div>
                    {optionSection === 'Privacy' && 
                    <div className="content"> privacy and setting part </div>}
                </div>



                <div className="option">
                    <div className="title" onClick={()=> toggleSection('Photos')} >
                        <span>Shared photos</span>
                        {optionSection === 'Photos'? <img src="./arrowUp.png" alt=""/>:<img src="./arrowDown.png" alt="" /> } 
                    </div>
                    {optionSection === 'Photos' && <SharedPhotos chatId={chatId} userId={currentUser.id} />
}

                </div>
                    


                <div className="option">
                    <div className="title" onClick={()=> toggleSection('Shared_Files')}>
                        <span>Shared Files</span>
                        {optionSection === 'Shared_Files'? <img src="./arrowUp.png" alt=""/>:<img src="./arrowDown.png" alt="" /> } 
                    </div>
                    {optionSection === 'Shared_Files' &&
                    <div className="content">
                        Shared Files part....
                        </div>}
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

