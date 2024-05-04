"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { app, AuthUserState } from "@/types/AuthUser";
import { connectAuthEmulator, signInAnonymously } from "firebase/auth";

const initialState: AuthUserState = {
	user: undefined,
};
const AuthContext = createContext<AuthUserState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<AuthUserState>(initialState);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("firebase/app").then(() => {
				import("@firebase/auth").then(({ getAuth, onAuthStateChanged }) => {
					const auth = getAuth(app);
					if (window.location.hostname === "localhost") {
						connectAuthEmulator(auth, "http://localhost:9099");
					}
					onAuthStateChanged(auth, (user) => {
						if (!user) {
							signInAnonymously(auth);
						}
						setUser({ user });
						setInitialized(true);
					});
				});
			});
		}
	}, []);

	if (!initialized) return null;

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
