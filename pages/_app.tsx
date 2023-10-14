import Wrapper from "@/components/Wrapper";
import AppProvider from "../providers";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => (
  <AppProvider>
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  </AppProvider>
);
export default App;
