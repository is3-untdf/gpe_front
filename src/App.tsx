import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Asignatura } from './app/Pages/Asignatura';
import { PlanDeEstudio } from './app/Pages/PlanDeEstudio'; // Importa PlanDeEstudio
import { ContenidosMinimos } from './app/Pages/ContenidosMinimos'; // Importa ContenidosMinimos
import { Play } from './app/Pages/Play'; // Importa Play
import myImage from "./images/logo_untdf.png";
import { AutoStories, Description, Functions, SignalCellularConnectedNoInternet1Bar, Subscriptions } from '@mui/icons-material';
import { Inicio } from './app/Pages/Inicio';
import { Intensidad } from './app/Pages/Intensidad';

const NAVIGATION: Navigation = [
  {
    segment: "planDeEstudio",
    title: "Plan de Estudio",
    icon: <AutoStories />,
  },
  {
    segment: 'asignatura',
    title: 'Asignatura',
    icon: <Functions />,
  },
  {
    segment: 'intensidad',
    title: 'Intensidad',
    icon: <SignalCellularConnectedNoInternet1Bar />,
  },
  {
    segment: 'contenidosMinimos',
    title: 'Contenidos Mínimos',
    icon: <Description />,
  },
  {
    segment: 'play',
    title: 'Play',
    icon: <Subscriptions />,
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

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={myImage} />,
        title: "Sistema Plan de Estudio",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {router.pathname === '/asignatura' && <Asignatura />}
        {router.pathname === '/planDeEstudio' && <PlanDeEstudio />}
        {router.pathname === '/contenidosMinimos' && <ContenidosMinimos />}
        {router.pathname === '/intensidad' && <Intensidad />}
        {router.pathname === '/play' && <Play />}
        {router.pathname === '/' && <Inicio />}
      </DashboardLayout>
    </AppProvider>
  );
}