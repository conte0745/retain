"use client";

import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, AuthUser } from "@/types/AuthUser";
import { useAuthToast } from "@Auth/hooks/useAuthToast";
import { AUTH_CONSTANT } from "@/utils/constant";

export const useSignIn = () => {
	const auth = getAuth(app);
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AuthUser>();

	const showAuthToast = useAuthToast();

	const onSubmit = async (values: AuthUser) => {
		if (!values.email || !values.password) {
			return;
		}

		const response = await signInWithEmailAndPassword(
			auth,
			values.email,
			values.password
		)
			.then((response) => {
				console.info(response);
				return response;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.SIGNIN);
	};

	return {
		handleSubmit,
		register,
		errors,
		isSubmitting,
		onSubmit,
	};
};
