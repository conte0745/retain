import { FC } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
} from "@chakra-ui/react";
import { useSearchVocabularies } from "@Vocabulary/hooks/useVocabularySearch";

export const SearchArea: FC = () => {
	const { searchValue, onChange, onSearch } = useSearchVocabularies();

	return (
		<form
			method=""
			action=""
			onSubmit={(e) => {
				e.preventDefault();
				onSearch();
				return false;
			}}
		>
			<FormControl>
				<FormLabel htmlFor="search"></FormLabel>
				<HStack>
					<Input
						id="search"
						width={"25em"}
						value={searchValue}
						onChange={onChange}
						placeholder="検索する内容を入力してください"
					/>
					<Button size="sm" colorScheme="teal" onClick={onSearch} type="submit">
						検索
					</Button>
				</HStack>
			</FormControl>
		</form>
	);
};
