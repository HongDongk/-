import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinId: string;
};

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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


const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId], 
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 5000,   //5초마다 패치
    }
  );
  
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading 😅" : infoData?.name}
        </Title>
      </Header>
      {loading ? 
        <Loader>Loading 😅</Loader> 
        : 
        <>
          <SubTitle>{state?.name ? state.name : loading ? "Loading 😅" : infoData?.name} 소개</SubTitle>
          <Description>{infoData?.description ? infoData.description : "정보없음" }</Description>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격</span>
              <span>$ {priceData?.quotes.USD.price.toFixed(0)}</span>
            </OverviewItem>
           </Overview>
           <Tabs>
             <Tab isActive={chartMatch !== null}>
               <Link to={`/${coinId}/chart`}>Chart</Link>
             </Tab>
             <Tab isActive={priceMatch !== null}>
               <Link to={`/${coinId}/price`}>Price</Link>
             </Tab>
           </Tabs>
           <Switch>
             <Route path={`/:coinId/chart`}>
               <Chart coinId={coinId} />
             </Route>
             <Route path={`/:coinId/price`}>
               <Price />
             </Route>
           </Switch>
        </>
      }
    </Container>
  );
};

export default Coin;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

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

const SubTitle = styled.h1`
  font-size: 20px;
  color:#00b894;
  font-weight:bolder;
`;

const Overview = styled.div`
  display: flex;
  margin-top:30px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 15px;
    margin-top:20px;
    color:#00b894;
  }
`;

const Description = styled.p`
  margin-top:40px;
  font-size:20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.isActive ? "#00b894" : props.theme.textColor};
  a {
    display: block;
  }
`;
