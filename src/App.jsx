import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/ui/AppLayout";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient } from "@tanstack/react-query";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MainPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>

          {/* Добавляем Devtools для удобства разработки */}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: "var(--color-success-500)", // Зеленый цвет иконки
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "var(--color-error-500)", // Красный цвет иконки
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
