"use client";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { app } from "@/types/AuthUser";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";
import { useSignUp } from "@/features/Authentication/hooks/useSignUp";
import { PASSWORD_PATTERN } from "@/utils/constant";

export const SignUp = () => {
	const auth = getAuth(app);

	const { handleSubmit, register, errors, isSubmitting, onSubmit } =
		useSignUp();

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
								value: new RegExp(PASSWORD_PATTERN),
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
