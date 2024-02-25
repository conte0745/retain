import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AuthUser, firebaseconfig } from "@/types/AuthUser";
import { FirebaseError, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<AuthUser>();
	const navigate = useNavigate();
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
			navigate("/todo");
		}
	};

	return (
		<>
			<h1>サインアップ</h1>
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
				</FormControl>
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
