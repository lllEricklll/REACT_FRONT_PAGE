// App.jsx
import React, { createContext, useState, useContext } from 'react';
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

export const AppContext = createContext({
  globalState: {}, // o cualquier otro valor predeterminado que desees
  setGlobalState: () => {}, // o cualquier otra función predeterminada
});

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Agrega el hook useContext para acceder a globalState
  const { globalState, setGlobalState } = useContext(AppContext);


  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles />
        <BrowserRouter>
          <Container className={sidebarOpen ? "sidebarState active" : ""}>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <MyRoutes />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;

export default App;
