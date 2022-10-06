import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.main`
  width: 400px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 40px;

  label {
    color: #7a7f8c;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
    display: block;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 0 0px 0;
`;
