// import React from 'react';
// import { Outlet } from 'react-router-dom';

// export default function Layout() {
//   return (
//     <div>
//       <header>
//         <h1>My App</h1>
//         <nav>
//           <ul>
//             <li><a href="/plan_estudio">Plan De Estudio</a></li>
//             <li><a href="/asignatura">Asignatura</a></li>
//             <li><a href="/contenidos_minimos">Contenidos Mínimos</a></li>
//             <li><a href="/play">Play</a></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import {
  AutoStories,
  Functions,
  Description,
  Subscriptions,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import myImage from "./images/logouni.jpg"; // Ruta de la imagen

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <Typography variant="h5">
        Bienvenido al Sistema Plan de Estudio
      </Typography> */}

      <Typography>{pathname}</Typography>
      <a href={pathname}></a>
    </Box>
  );
}

// export const AprobacionPlanos = (): JSX.Element => {
export const Layout = (): JSX.Element => {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => {
        const newPath = typeof path === "string" ? path : path.toString(); // Convertir URL a string si es necesario
        setPathname(newPath);
        window.history.pushState({}, "", newPath); // Cambiar la URL en la barra de navegación
      },
    }),
    [pathname]
  );

  return (
    <AppProvider
      navigation={[
        {
          segment: "plan_estudio",
          title: "Plan de Estudio",
          icon: <AutoStories />,
        },
        { segment: "asignatura", title: "Asignaturas", icon: <Functions /> },
        {
          segment: "contenidos_minimos",
          title: "Contenidos Mínimos",
          icon: <Description />,
        },
        { segment: "play", title: "Play", icon: <Subscriptions /> },
      ]}
      branding={{
        logo: <img src={myImage} />,
        title: "Sistema Plan de Estudio",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Layout } from './Layout';
// import { Asignatura } from './app/Pages/Asignatura';
// import { PlanDeEstudio } from './app/Pages/PlanDeEstudio';
// import { ContenidosMinimos } from './app/Pages/ContenidosMinimos';
// import { Play } from './app/Pages/Play';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="/plan_estudio" element={<PlanDeEstudio />} />
//           <Route path="/asignatura" element={<Asignatura />} />
//           <Route path="/contenidos_minimos" element={<ContenidosMinimos />} />
//           <Route path="/play" element={<Play />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }