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
import { FirebaseError, initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { redirect } from "next/navigation";

export const SignUp = () => {
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

		if (response instanceof FirebaseError) {
			console.error(response);
			toast({
				title: "Failed",
				description: "サインアップに失敗しました。",
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "サインアップに成功しました。",
				status: "success",
				isClosable: true,
			});
		}
	};
	if (!auth.currentUser?.isAnonymous) {
		redirect("/drill");
	}

	return (
		<>
			<Heading>サインアップ</Heading>
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={errors.email && true}>
					<FormLabel htmlFor="email">E-MAIL</FormLabel>
					<Input
						id="email"
						type="email"
						{...register("email", {
							required: "必須項目です。",
						})}
					/>
					<FormErrorMessage>
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
					/>
					<FormErrorMessage>
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
							maxLength: 10,
						})}
					/>
					<FormErrorMessage>
						{errors.displayName && errors.displayName.message}
					</FormErrorMessage>
				</FormControl>
				<br />

				<Button
					size="sm"
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					SignUp
				</Button>
			</form>
		</>
	);
};
