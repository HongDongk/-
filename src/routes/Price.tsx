import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import { RiseOutlined, FallOutlined, LineOutlined } from '@ant-design/icons';
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = ({ coinId }: PriceProps) => {

  const { isLoading, data } = useQuery<PriceData>(["price",coinId], () => fetchCoinPrice(coinId));
  const hourprice = Number(data?.quotes.USD.percent_change_1h)
  const dayprice = Number(data?.quotes.USD.percent_change_24h)
  const yearprice = Number(data?.quotes.USD.percent_change_1y)


  return(
    <div>
      {isLoading ? 
        "Loading Price..."
        :
        <div>
          <PriceBox>
            <Title>1시간 전보다..</Title>
            <SubTitle>{hourprice}%</SubTitle>
            <Graph>{hourprice > 0 ? <RiseOutlined/> : hourprice === 0 ? <LineOutlined/> : <FallOutlined/>}</Graph>
          </PriceBox>
          <PriceBox>
            <Title>하루 전보다..</Title>
            <SubTitle>{dayprice}%</SubTitle>
            <Graph>{dayprice > 0 ? <RiseOutlined/> : dayprice === 0 ? <LineOutlined/> : <FallOutlined/>}</Graph>
          </PriceBox>
          <PriceBox>
            <Title>1년 전보다..</Title>
            <SubTitle>{yearprice}%</SubTitle>
            <Graph>{yearprice > 0 ? <RiseOutlined/> : yearprice === 0 ? <LineOutlined/> : <FallOutlined/>}</Graph>
          </PriceBox>
        </div>
      }
    </div>
  );
}

export default Price;


const Title = styled.h1`
  width:100%;
  font-size:18px;
  margin-bottom:10px;
`;

const PriceBox = styled.div`
  margin:30px 0;
  display: flex;
  flex-wrap:wrap;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px 20px;
  border-radius: 10px;
`;

const SubTitle = styled.h2`
  margin-top:15px;
  color:#00b894;
  font-weight:bolder;
  font-size:18px;
`;

const Graph = styled.div`
  display:flex;
  justify-content:flex-end;
  font-size:80px;
  width:80%;
  color:#00b894;
  font-weight:bolder;
`;
