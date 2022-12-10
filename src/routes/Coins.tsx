import styled from "styled-components";

const Coins = () => {
  return(
    <Title>Coins</Title>
  );
};

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor}
`;

export default Coins;