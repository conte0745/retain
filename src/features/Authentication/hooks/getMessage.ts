"use client";

import { AUTH_CONSTANT } from "@/utils/constant";
import { FirebaseError } from "firebase/app";

export function getSuccessMessage(page: AUTH_CONSTANT) {
	switch (page) {
		case AUTH_CONSTANT.SIGNIN:
			return "サインインしました。";
		case AUTH_CONSTANT.SIGNUP:
			return "サインアップしました。";
		case AUTH_CONSTANT.SIGNOUT:
			return "サインアウトしました。";
		case AUTH_CONSTANT.CHANGE:
			return "ユーザ情報を更新しました。";
		case AUTH_CONSTANT.WITHDRAW:
			return "退会処理が完了しました。";
		default:
			return "OK";
	}
}

export function getFailedMessage(response: FirebaseError) {
	switch (response.code) {
		case "auth/user-not-found":
			return "ユーザが見つかりません。";
		case "auth/wrong-password":
			return "パスワードが間違っています。";
		case "auth/email-already-exists":
			return "そのメールアドレスはすでに登録されています。";
		case "auth/internal-error":
			return "内部エラーが発生しました。";
		case "auth/invalid-email":
			return "無効なメールアドレスです。";
		case "auth/invalid-password":
			return "無効なパスワードです。";
		case "auth/user-disabled":
			return "アカウントが無効になっています。";
		case "auth/user-token-expired":
			return "ユーザトークンが期限切れです。";
		case "auth/weak-password":
			return "パスワードが弱すぎます。";
		case "auth/invalid-credential":
			return "無効な認証情報です。";
		case "auth/invalid-verification-code":
			return "無効な検証コードです。";
		case "auth/invalid-verification-id":
			return "無効な検証IDです。";
		case "auth/network-request-failed":
			return "ネットワークリクエストが失敗しました。";
		case "auth/requires-recent-login":
			return "再度ログインしてください。";
		case "auth/session-expired":
			return "セッションの有効期限が切れました。再度ログインしてください。";
		case "auth/unauthorized-domain":
			return "許可されていないドメインです。";
		case "auth/user-mismatch":
			return "ユーザが一致しません。";
		case "auth/app-deleted":
			return "アプリが削除されました。";
		case "auth/app-not-authorized":
			return "アプリが承認されていません。";
		case "auth/captcha-check-failed":
			return "CAPTCHA のチェックに失敗しました。";
		case "auth/credential-already-in-use":
			return "認証情報がすでに使用されています。";
		case "auth/email-already-in-use":
			return "そのメールアドレスはすでに登録されています。";
		case "auth/invalid-api-key":
			return "無効な API キーです。";
		case "auth/invalid-user-token":
			return "無効なユーザートークンです。";
		case "auth/operation-not-allowed":
			return "この操作は許可されていません。";
		case "auth/timeout":
			return "タイムアウトしました。";
		case "auth/web-storage-unsupported":
			return "Web ストレージがサポートされていません。";
		default:
			return response.message;
	}
}
