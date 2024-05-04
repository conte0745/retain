export enum TASK {
	ADD,
	UPDATE,
	DELETE,
	SHOW,
}

export enum STATE {
	SUCCESS,
	ERROR,
	FORBIDDEN,
	INFO,
}

export function getMessageTask(task: TASK) {
	switch (task) {
		case TASK.ADD:
			return "追加";
		case TASK.UPDATE:
			return "更新";
		case TASK.DELETE:
			return "削除";
		case TASK.SHOW:
			return "データ取得";
	}
}

export function getMessageState(state: STATE) {
	switch (state) {
		case STATE.SUCCESS:
			return "に成功しました。";
		case STATE.ERROR:
			return "に失敗しました。";
		case STATE.FORBIDDEN:
			return "に失敗しました。使用できない単語が含まれています。";
		case STATE.INFO:
			return "しました。";
	}
}

export function getTitleState(state: STATE) {
	switch (state) {
		case STATE.SUCCESS:
			return "Success";
		case STATE.ERROR:
			return "Error";
		case STATE.FORBIDDEN:
			return "Error";
		case STATE.INFO:
			return "Info";
	}
}

export function getState(state: STATE) {
	switch (state) {
		case STATE.SUCCESS:
			return "success";
		case STATE.ERROR:
			return "error";
		case STATE.FORBIDDEN:
			return "error";
		case STATE.INFO:
			return "info";
	}
}
