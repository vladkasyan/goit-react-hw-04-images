import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  SearchBars,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.module';

export const SearchBar = ({ onSubmit }) => {
  // state = {
  //     searchQuery: ``
  // };
  const [searchQuery, setsearchQuery] = useState('');

  const SubmitForm = event => {
    event.preventDefault();
    const trimSearchQuery = searchQuery.trim();

    if (trimSearchQuery === '') {
      toast.info('Please, enter search word!');
      return;
    }

    onSubmit(trimSearchQuery);
    setsearchQuery('');
  };

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setsearchQuery(value.toLowerCase());
  };

  return (
    <SearchBars>
      <SearchForm onSubmit={SubmitForm}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
          name="searchQuery"
          value={searchQuery}
        />
      </SearchForm>
    </SearchBars>
  );
};
