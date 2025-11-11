import React from "react";
import Translator from "./components/Translator";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🌍 React Language Translator</h2>
      <Translator />
    </div>
  );
}

export default App;
