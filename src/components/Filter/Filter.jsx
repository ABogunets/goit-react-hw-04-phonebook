import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  FilterWrapper,
  FilterLabel,
  FilterInput,
} from 'components/Filter/Filter.styled';

export const Filter = ({ value, onChangeFilter }) => {
  const filterInputId = nanoid();
  return (
    <FilterWrapper>
      <FilterLabel htmlFor={filterInputId}>Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        id={filterInputId}
        value={value}
        onChange={onChangeFilter}
      />
    </FilterWrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};
