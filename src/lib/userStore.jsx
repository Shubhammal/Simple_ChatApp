import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false })

        try {

            const docRef = doc(db, "username", uid);
            const docSnap = await getDoc(docRef);
            console.log("ayaa kya:" + docSnap.data());
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
            }

        } catch (err) {
            console.log(err)
            return set({ currentUser: null, isLoading: false })
        }
    }
}))