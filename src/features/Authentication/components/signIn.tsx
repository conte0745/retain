"use client";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useSignIn } from "@Auth/hooks/useSignIn";

export const SignIn = () => {
	const { handleSubmit, register, errors, isSubmitting, onSubmit } =
		useSignIn();

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
