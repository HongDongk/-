import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";

import { fetchCoins } from "../api";

interface CoinInsData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};


const Coins = () => {
  
  const { isLoading, data } = useQuery<CoinInsData[]>(["allCoins"], fetchCoins);
  
  return(
    <Container>
      <Header>
        <Title>암호화폐</Title>
      </Header>
      {isLoading ?  <Loader>Loading 😅</Loader>  :  
        <CoinsList>
            {data?.slice(0,100).map((coin)=>(
            <Coin key = {coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,  // Link를 통해 Coin페이지에서 코인이름을 넘겨받게해줌
                  state: { name: coin.name },
                }} 
              >
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} 
              </Link>
            </Coin>
            ))}
        </CoinsList> 
      }
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  font-weight:bolder;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
  background-color:#dfe6e9;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export default Coins;