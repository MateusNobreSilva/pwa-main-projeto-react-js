import styled from 'styled-components';

export const Versao = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 16px 4px 0;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #cecece;
`;

export const Banner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  display: flex;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #0d3c61;
  align-items: center;
  background-color: #fff;
  z-index: 5000;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 4%), 0px 6px 10px 0px rgb(0 0 0 / 4%),
    0px 1px 18px 0px rgb(0 0 0 / 4%);

  svg {
    font-size: 2rem;
    margin-right: 12px;
  }

  span {
    margin-right: 8px;
  }
`;
