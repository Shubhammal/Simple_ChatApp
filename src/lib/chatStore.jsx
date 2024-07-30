import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: async (chatId, userId) => {
        try {
            console.log("Starting changeChat function");
            console.log("Received chatId:", chatId);
            console.log("Received userId:", userId);

            if (!userId) {
                console.error("User ID is undefined");
                return;
            }

            // Fetch user data from Firestore
            const userDocRef = doc(db, "username", userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                console.error("User does not exist");
                return;
            }

            const user = userDoc.data();
            console.log("Fetched user data:", user);

            const currentUser = useUserStore.getState().currentUser;

            // Ensure currentUser and user are valid objects
            if (!currentUser || !user) {
                console.error("Current user or fetched user is invalid");
                return;
            }

            if (!currentUser.blocked) {
                currentUser.blocked = [];
            }
            if (!user.blocked) {
                user.blocked = [];
            }

            //CHECK IF CURRENT USER IS BLOCKED
            if (user.blocked.includes(currentUser.id)) {
                return set({
                    chatId,
                    user: null,
                    isCurrentUserBlocked: true,
                    isReceiverBlocked: false,
                });
            }

            // CHECK IF RECEIVER IS BLOCKED
            if (currentUser.blocked.includes(user.id)) {
                return set({
                    chatId,
                    user: user,
                    isCurrentUserBlocked: false,
                    isReceiverBlocked: true,
                });
            }

            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });

        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    },
    changeBlock: () => {
        set(state => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
    }
}));
