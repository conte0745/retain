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
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseconfig } from "@/types/AuthUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignIn = () => {
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AuthUser>();
	const toast = useToast();
	const [errorMsg, setErrorMsg] = useState<string | undefined | null>();
	const navigate = useNavigate();

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
				return response.user;
			})
			.catch((response) => {
				return response;
			});

		if (response instanceof FirebaseError) {
			toast({
				title: "Failed",
				description: "サインインに失敗しました。",
				status: "error",
				isClosable: true,
			});
			if (response.code === "auth/invalid-credential")
				setErrorMsg("メールアドレスもしくはパスワードが異なります.");
			else {
				setErrorMsg(response.message);
			}
		} else {
			toast({
				title: "Success",
				description: "サインインに成功しました。",
				status: "success",
				isClosable: true,
			});
			setErrorMsg(undefined);
			navigate("/todo");
		}
	};
	return (
		<>
			<Heading>サインイン</Heading>
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
					<p className="error">{errorMsg}</p>
				</FormControl>
				<br />
				<Button
					size="sm"
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					SignIn
				</Button>
			</form>
		</>
	);
};
