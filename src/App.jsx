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
        <GlobalStyles />

        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<MainPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>

        {/* Добавляем Devtools для удобства разработки */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
