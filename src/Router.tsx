import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import NotFound from "./Errorpage/NotFound";
import ErrorData from "./Errorpage/ErrorData";

const Router = createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    children: [
      {
        path : "",
        element: <Coins/>,
        errorElement:<NotFound/>
      },
      {
        path : ":coinId",
        element : <Coin/>,
        children: [
          {
            path: "chart",
            element: <Chart/>,
            errorElement: <ErrorData/>
          },
          {
            path: "price",
            element: <Price/>,
            errorElement: <ErrorData/>
          },
        ],
        errorElement:<NotFound/>
      }
    ],
    errorElement:<NotFound/>
  }
]);

export default Router;