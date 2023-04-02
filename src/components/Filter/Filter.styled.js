import styled from 'styled-components';

export const FilterWrapper = styled.div`
  border: 1px solid SteelBlue;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px 100px 5px 5px;
  margin-top: 10px;
`;
export const FilterLabel = styled.label`
  padding: 5px 5px;
  color: Navy;
`;

export const FilterInput = styled.input`
  border: none;
  padding: 5px 5px;
  &:focus {
    outline: 2px solid SteelBlue;
  }
  color: Navy;
`;
