"use client";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Spacer,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { app } from "@/types/AuthUser";
import { PASSWORD_PATTERN } from "@/utils/constant";
import { useChangeProfile } from "@Auth/hooks/useChangeProfile";

export const Change = () => {
	const auth = getAuth(app);

	const {
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
	} = useChangeProfile();

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
								value: new RegExp(PASSWORD_PATTERN),
								message:
									"大文字・小文字・英数字を少なくとも1つ以上含めてください。",
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
