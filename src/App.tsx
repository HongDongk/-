import { createGlobalStyle } from "styled-components";
import { Reset } from 'styled-reset';
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }
  a {
    text-decoration:none;
    color: inherit
  }
`;

function App() {
  return (
    <>
      <Reset/>
      <GlobalStyle/>
      <Router/>
    </>
  );
}

export default App;
