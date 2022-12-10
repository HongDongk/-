import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};


const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const coindata = await response.json();
      setCoins(coindata.slice(0,100));
      setLoading(false);
    })(); // 함수바로실행
  }, []);

  return(
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ?  <Loader>Loading 😅</Loader>  :  
        <CoinsList>
            {coins.map((coin)=>(
            <Coin key = {coin.id}>
                <Link to ={`/${coin.id}`}>{coin.name}</Link>
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
  font-size: 30px;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
  background-color:#dfe6e9;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export default Coins;