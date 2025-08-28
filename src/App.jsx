import { useState } from "react";
import LandingPage from "./index";
import FormPage from "./form";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      {started ? (
        <FormPage />
      ) : (
        <LandingPage onStart={() => setStarted(true)} />
      )}
    </div>
  );
}
