import { useState } from "react";

import Timer from "./Timer/Timer";
import Stepper from "./Stepper/Stepper";

const App: React.FC = () => {
  const [testValue, setTestValue] = useState(180);

  return (
    <div>
      <Timer />
      <Stepper value={testValue} setter={setTestValue} label="Test label:" min={0} max={5} />
    </div>
  )
}

export default App;