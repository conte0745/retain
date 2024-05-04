import { useToast } from "@chakra-ui/react";
import {
	getMessageState,
	getMessageTask,
	getTitleState,
	getState,
	STATE,
	TASK,
} from "@Vocabulary/hooks/getMessage";

export const useVocabularyToast = () => {
	const toast = useToast();

	const showToast = (task: TASK, state: STATE) => {
		toast({
			title: getTitleState(state),
			description: getMessageTask(task) + getMessageState(state),
			status: getState(state),
		});
	};

	return {
		showToast,
	};
};
