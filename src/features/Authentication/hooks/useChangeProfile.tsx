"use client";

import { useForm } from "react-hook-form";
import {
	getAuth,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";
import { app, AuthUser } from "@/types/AuthUser";
import { redirect } from "next/navigation";
import { useAuthToast } from "@Auth/hooks/useAuthToast";
import { AUTH_CONSTANT } from "@/utils/constant";

export const useChangeProfile = () => {
	const auth = getAuth(app);
	const showAuthToast = useAuthToast();

	const {
		handleSubmit: handleSubmitEmail,
		register: registerEmail,
		formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail },
	} = useForm<AuthUser>();

	const {
		handleSubmit: handleSubmitPassword,
		register: registerPassword,
		formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
	} = useForm<AuthUser>();

	const {
		handleSubmit: handleSubmitDisplayName,
		register: registerDisplayName,
		formState: {
			errors: errorsDisplayName,
			isSubmitting: isSubmittingDisplayName,
		},
	} = useForm<AuthUser>();

	const onSubmitEmail = async (values: AuthUser) => {
		const response = await updateEmail(auth.currentUser!, values.email)
			.then((response) => {
				console.info(response);
				return response;
			})
			.catch((error) => {
				console.error(error);
				signOutRedirect(error.code);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.CHANGE);
	};

	const onSubmitPassword = async (values: AuthUser) => {
		const response = await updatePassword(auth.currentUser!, values.password)
			.then((response) => {
				console.info(response);
				return response;
			})
			.catch((error) => {
				console.error(error);
				signOutRedirect(error.code);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.CHANGE);
	};

	const onSubmitDisplayName = async (values: AuthUser) => {
		const response = await updateProfile(auth.currentUser!, {
			displayName: values.displayName,
		})
			.then((response) => {
				console.info(response);
				return response;
			})
			.catch((error) => {
				console.error(error);
				signOutRedirect(error.code);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.CHANGE);
	};

	const signOutRedirect = (code: string | undefined) => {
		if (!code && code === "auth/requires-recent-login") {
			signOut(auth).then(() => {
				redirect("/signin");
			});
		}
	};

	return {
		handleSubmitEmail,
		registerEmail,
		errorsEmail,
		isSubmittingEmail,
		handleSubmitPassword,
		registerPassword,
		errorsPassword,
		isSubmittingPassword,
		handleSubmitDisplayName,
		registerDisplayName,
		errorsDisplayName,
		isSubmittingDisplayName,
		onSubmitEmail,
		onSubmitPassword,
		onSubmitDisplayName,
	};
};
