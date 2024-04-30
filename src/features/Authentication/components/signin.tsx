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
import { AuthUser } from "@/types/AuthUser";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseconfig } from "@/types/AuthUser";
import { toastAuth } from "./toastAuth";

export const SignIn = () => {
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);
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

		const response = await signInWithEmailAndPassword(
			auth,
			values.email!,
			values.password!
		)
			.then((response) => {
				return response;
			})
			.catch((response) => {
				return response;
			});

		toastAuth(toast, response, "signin");
	};
	return (
		<>
			<Heading id="signin-heading">サインイン</Heading>
			<br />
			<form onSubmit={handleSubmit(onSubmit)} id="signin-form">
				<FormControl isInvalid={errors.email && true}>
					<FormLabel htmlFor="email">E-MAIL</FormLabel>
					<Input
						id="email"
						type="email"
						{...register("email", {
							required: "必須項目です。",
						})}
					/>
					<FormErrorMessage className="signin-email-errors">
						{errors.email && errors.email.message}
					</FormErrorMessage>
				</FormControl>
				<br />
				<FormControl isInvalid={errors.password && true}>
					<FormLabel htmlFor="password">PASSWORD</FormLabel>
					<Input
						id="password"
						type="password"
						{...register("password", {
							required: "必須項目です。",
						})}
						autoComplete="on"
					/>
					<FormErrorMessage className="signin-password-errors">
						{errors.password && errors.password.message}
					</FormErrorMessage>
				</FormControl>
				<br />
				<Button
					size="sm"
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
					id="signin-button"
				>
					SignIn
				</Button>
			</form>
		</>
	);
};
