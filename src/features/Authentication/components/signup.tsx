"use client";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AuthUser, firebaseconfig } from "@/types/AuthUser";
import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { useToastAuth } from "./toastAuth";

export const SignUp = () => {
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);
	const passwordPattern =
		"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}[]|;:'\",.<>?]).{8,}$";
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AuthUser>();
	const toast = useToast();

	const onSubmit = async (values: AuthUser) => {
		if (!values.email && !values.password) {
			return;
		}
		const response = await createUserWithEmailAndPassword(
			auth,
			values.email!,
			values.password!
		)
			.then((userCredential) => {
				updateProfile(userCredential.user, { displayName: values.displayName });
				return userCredential.user;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		useToastAuth(toast, response, "signup");
	};
	if (!auth.currentUser?.isAnonymous) {
		redirect("/drill");
	}

	return (
		<>
			<Heading id="signup-heading">サインアップ</Heading>
			<br />
			<form onSubmit={handleSubmit(onSubmit)} id="signup-form">
				<FormControl isInvalid={errors.email && true}>
					<FormLabel htmlFor="email">Eメール</FormLabel>
					<Input
						id="email"
						type="email"
						{...register("email", {
							required: "必須項目です。",
						})}
					/>
					<FormErrorMessage className="signup-email-errors">
						{errors.email && errors.email.message}
					</FormErrorMessage>
				</FormControl>
				<br />

				<FormControl isInvalid={errors.password && true}>
					<FormLabel htmlFor="password">パスワード</FormLabel>
					<Input
						id="password"
						type="password"
						{...register("password", {
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
					<FormErrorMessage className="signup-password-errors">
						{errors.password && errors.password.message}
					</FormErrorMessage>
				</FormControl>
				<br />

				<FormControl isInvalid={errors.displayName && true}>
					<FormLabel htmlFor="displayName">表示名（任意）</FormLabel>
					<Input
						id="displayName"
						type="text"
						{...register("displayName", {
							maxLength: {
								value: 10,
								message: "10文字以下で入力してください。",
							},
						})}
					/>
					<FormErrorMessage className="signup-displayName-errors">
						{errors.displayName && errors.displayName.message}
					</FormErrorMessage>
				</FormControl>
				<br />

				<Button
					size="sm"
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
					id="signup-button"
				>
					SignUp
				</Button>
			</form>
		</>
	);
};
