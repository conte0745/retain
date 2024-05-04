"use client";

import { useForm } from "react-hook-form";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { app, AuthUser } from "@/types/AuthUser";
import { useAuthToast } from "@Auth/hooks/useAuthToast";
import { AUTH_CONSTANT } from "@/utils/constant";

export const useSignUp = () => {
	const auth = getAuth(app);
	const showAuthToast = useAuthToast();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AuthUser>();

	const onSubmit = async (values: AuthUser) => {
		if (!values.email && !values.password) {
			return;
		}

		const response = await createUserWithEmailAndPassword(
			auth,
			values.email,
			values.password
		)
			.then((userCredential) => {
				updateProfile(userCredential.user, { displayName: values.displayName });
				return userCredential.user;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.SIGNUP);
	};

	return {
		handleSubmit,
		register,
		errors,
		isSubmitting,
		onSubmit,
	};
};
