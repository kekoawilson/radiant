import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = (props) => <Input onChange={props.onChange} placeholder="Search..." />;

export default SearchInput;
