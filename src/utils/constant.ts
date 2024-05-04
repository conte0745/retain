"use client";

export enum AUTH_CONSTANT {
	SIGNUP,
	SIGNIN,
	SIGNOUT,
	WITHDRAW,
	CHANGE,
}

export enum MODE {
	INPUT,
	SEARCH,
}

export const TIME_ZONE = "Asia/Tokyo";

export const PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$";
