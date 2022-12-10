import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  
  const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  
  return(
    <div>Chart</div>
  )
}
  
export default Chart;