import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Asignatura } from './app/Pages/Asignatura';
import myImage from "./images/logo_untdf.png";
import { AutoStories, Description, Functions, Subscriptions } from '@mui/icons-material';
import { PlanDeEstudio } from './app/Pages/PlanDeEstudio';
import { ContenidosMinimos } from './app/Pages/ContenidosMinimos';
import { Play } from './app/Pages/Play';
import { Inicio } from './app/Pages/Inicio';
import { useEffect } from 'react';
import "./App.css";

const NAVIGATION = [
  {
    segment: "PlanDeEstudio",
    title: "Plan de Estudio",
    icon: <AutoStories />,
    path: '/PlanDeEstudio',
  },
  {
    segment: 'Asignatura',
    title: 'Asignatura',
    icon: <Functions />,
    path: '/Asignatura',
  },
  {
    segment: 'ContenidosMinimos',
    title: 'Contenidos Mínimos',
    icon: <Description />,
    path: '/ContenidosMinimos',
  },
  {
    segment: 'Play',
    title: 'Play',
    icon: <Subscriptions />,
    path: '/Play',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
}

function DashboardLayoutNoMiniSidebar(props: DemoProps) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={myImage} />,
        title: "Sistema Plan de Estudio",
      }}
    >
      <DashboardLayout CollapsibleSidebar>
        <div className="full-screen-container">
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
          <Routes>
            <Route path="/PlanDeEstudio" element={<PlanDeEstudio />} />
          </Routes>
          <Routes>
            <Route path="/Asignatura" element={<Asignatura />} />
          </Routes>
          <Routes>
            <Route path="/ContenidosMinimos" element={<ContenidosMinimos />} />
          </Routes>
          <Routes>
            <Route path="/Play" element={<Play />} />
          </Routes>
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}

export default function App() {
  useEffect(() => {
    document.title = 'Sistema Plan de Estudio';
  }, [])

  return (
    <Router>
      <DashboardLayoutNoMiniSidebar />
    </Router>
  );
}
