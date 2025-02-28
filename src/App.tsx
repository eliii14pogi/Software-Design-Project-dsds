import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SimpleFrontPage from "./components/landing/SimpleFrontPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<SimpleFrontPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/inventory" element={<Home />} />
          <Route path="/calendar" element={<Home />} />
          <Route path="/history" element={<Home />} />
          <Route path="/safety" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
