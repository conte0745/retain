"use client";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthUserState, firebaseconfig } from "@/types/AuthUser";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { signInAnonymously } from "firebase/auth";

const initialState: AuthUserState = {
	user: undefined,
};
const AuthContext = createContext<AuthUserState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<AuthUserState>(initialState);
	const app = initializeApp(firebaseconfig);

	useEffect(() => {
		try {
			const auth = getAuth(app);
			return onAuthStateChanged(auth, (user) => {
				if (!user) {
					signInAnonymously(auth);
				}
				setUser({
					user,
				});
			});
		} catch (error) {
			setUser(initialState);
			throw error;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
