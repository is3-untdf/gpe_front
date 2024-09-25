import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router } from '@toolpad/core';
import { AutoStories, Functions, Subscriptions } from '@mui/icons-material';
import { useEffect } from 'react';

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

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function AppCopy (props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/home');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  useEffect(() => {
    document.title = 'Sistema Plan de Estudio';
  }, [])
  
  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: 'plan_estudio',
          title: 'Plan de Estudio',
          icon: <AutoStories />,
        },
        {
          segment: 'asignatura',
          title: 'Asignaturas',
          icon: <Functions />,
        },
        {
          segment: 'contenidos_minimos',
          title: 'Contenidos Mínimos',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'play',
          title: 'Play',
          icon: <Subscriptions />,
        },
      ]}
      branding={{
        logo: <img src='../src/images/logouni.png' alt="MUI logo" />,
        title: 'MUI',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}




// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { createTheme } from '@mui/material/styles';
// import { AutoStories, Functions, Description, Subscriptions } from '@mui/icons-material';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent() {
//   return (
//     <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//       <Typography variant="h5">Bienvenido al Sistema Plan de Estudio</Typography>
//     </Box>
//   );
// }

// // export const AprobacionPlanos = (): JSX.Element => {
// export const Layout = (): JSX.Element =>  {
//   const [pathname, setPathname] = React.useState(window.location.pathname);

//   const router = React.useMemo(() => ({
//     pathname,
//     searchParams: new URLSearchParams(),
//     navigate: (path: string | URL) => {
//       const newPath = typeof path === 'string' ? path : path.toString();  // Convertir URL a string si es necesario
//       setPathname(newPath);
//       window.history.pushState({}, '', newPath);  // Cambiar la URL en la barra de navegación
//     },
//   }), [pathname]);

//   return (
//     <AppProvider
//       navigation={[
//         { segment: 'plan_estudio', title: 'Plan de Estudio', icon: <AutoStories /> },
//         { segment: 'asignatura', title: 'Asignaturas', icon: <Functions /> },
//         { segment: 'contenidos_minimos', title: 'Contenidos Mínimos', icon: <Description /> },
//         { segment: 'play', title: 'Play', icon: <Subscriptions /> },
//       ]}
//       router={router}
//       theme={demoTheme}
//     >
//       <DashboardLayout>
//         <DemoPageContent />
//         <main>
//           <Outlet />
//         </main>
//       </DashboardLayout>
//     </AppProvider>
//   );
// }