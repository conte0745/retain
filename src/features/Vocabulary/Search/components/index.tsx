import { FC, useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
} from "@chakra-ui/react";

import { useVocabularies } from "@Vocabulary/VocabularyContext";

export const SearchArea: FC = () => {
	const [searchValue, setSearchValue] = useState("");
	const { setVocabularies } = useVocabularies();

	const onChangeSearchArea = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	function onClickSearch(): void {
		setVocabularies((prevItems) => {
			if (!prevItems) return null;
			return prevItems.map((item) => ({
				...item,
				isDisplay: searchValue.length === 0 || item.title.includes(searchValue),
			}));
		});
	}

	return (
		<>
			<form
				method=""
				action=""
				onSubmit={(e) => {
					e.preventDefault();
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
							onChange={onChangeSearchArea}
							placeholder="検索する内容を入力してください"
						/>
						<Button
							size="sm"
							colorScheme="teal"
							onClick={onClickSearch}
							type="submit"
						>
							検索
						</Button>
					</HStack>
				</FormControl>
			</form>
		</>
	);
};
