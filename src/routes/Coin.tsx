import { useParams } from "react-router";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
};

const Coin = () => {
  const { coinId } = useParams<RouteParams>();

  return (
    <h1>Coin: {coinId}</h1>
  );
};

export default Coin;