"use client";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Spacer,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AuthUser, firebaseconfig } from "@/types/AuthUser";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";
import { toastAuth } from "./toastAuth";
import { useState } from "react";
import { redirect } from "react-router-dom";

export const Change = () => {
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);
	const toast = useToast();
	const [code, setCode] = useState<string | undefined | null>();
	const passwordPattern =
		"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}[]|;:'\",.<>?]).{8,}$";

	if (code == "auth/requires-recent-login") {
		signOut(auth).then(() => {
			redirect("/signin");
		});
	}
	//          fgRRT$

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
		if (auth.currentUser === null) {
			throw new Error("User not auth");
		}

		if (!values.email) {
			return;
		}

		const responseEmail = await updateEmail(auth.currentUser!, values.email)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		setCode(toastAuth(toast, responseEmail, "change"));
	};

	const onSubmitPassword = async (values: AuthUser) => {
		if (auth.currentUser === null) {
			throw new Error("User not auth");
		}

		if (!values.password) {
			return;
		}

		const responsePassword = await updatePassword(
			auth.currentUser!,
			values.password
		)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		setCode(toastAuth(toast, responsePassword, "change"));
	};

	const onSubmitDisplayName = async (values: AuthUser) => {
		if (auth.currentUser === null) {
			throw new Error("User not auth");
		}

		const responseDisplayName = await updateProfile(auth.currentUser!, {
			displayName: values.displayName,
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		setCode(toastAuth(toast, responseDisplayName, "change"));
	};

	return (
		<>
			<form onSubmit={handleSubmitEmail(onSubmitEmail)} id="email-form">
				<FormControl isInvalid={errorsEmail.email && true}>
					<FormLabel htmlFor="email">E-MAIL</FormLabel>
					<Input
						id="email"
						type="email"
						defaultValue={auth.currentUser?.email ?? ""}
						{...registerEmail("email", {
							required: "必須項目です。",
						})}
					/>
					<FormErrorMessage className="change-email-errors">
						{errorsEmail.email && errorsEmail.email.message}
					</FormErrorMessage>
				</FormControl>
				<HStack margin={"1rem"}>
					<Spacer />
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmittingEmail}
						type="submit"
						id="change-email-button"
					>
						Emailの変更
					</Button>
				</HStack>
			</form>

			<form
				onSubmit={handleSubmitPassword(onSubmitPassword)}
				id="password-form"
			>
				<FormControl isInvalid={errorsPassword.password && true}>
					<FormLabel htmlFor="password">PASSWORD</FormLabel>
					<Input
						id="password"
						type="password"
						placeholder="現在のパスワードは表示できません"
						{...registerPassword("password", {
							required: "必須項目です。",
							minLength: {
								value: 8,
								message: "少なくとも8文字以上入力してください。",
							},
							pattern: {
								value: new RegExp(passwordPattern),
								message:
									"大文字・小文字・英数字・特殊文字を少なくとも1つ以上含めてください。",
							},
						})}
						autoComplete="on"
					/>
					<FormErrorMessage className="change-password-errors">
						{errorsPassword.password && errorsPassword.password.message}
					</FormErrorMessage>
				</FormControl>
				<HStack margin={"1rem"}>
					<Spacer />
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmittingPassword}
						type="submit"
						id="change-password-button"
					>
						パスワードの変更
					</Button>
				</HStack>
			</form>

			<form
				onSubmit={handleSubmitDisplayName(onSubmitDisplayName)}
				id="displayName-form"
			>
				<FormControl isInvalid={errorsDisplayName.displayName && true}>
					<FormLabel htmlFor="displayName">表示名（任意）</FormLabel>
					<Input
						id="displayName"
						type="text"
						defaultValue={auth.currentUser?.displayName ?? ""}
						{...registerDisplayName("displayName", {
							maxLength: {
								value: 10,
								message: "10文字以下の入力をしてください。",
							},
						})}
					/>
					<FormErrorMessage className="change-displayName-errors">
						{errorsDisplayName.displayName &&
							errorsDisplayName.displayName.message}
					</FormErrorMessage>
				</FormControl>
				<HStack margin={"1rem"}>
					<Spacer />
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmittingDisplayName}
						type="submit"
						id="change-displayName-button"
					>
						表示名の変更
					</Button>
				</HStack>
			</form>
		</>
	);
};
