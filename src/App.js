import { useState } from "react";
import json from "./data/data.json";

function App() {
  const [data, setData] = useState(json);
  return (
    <div>
      <input type="search" />
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <ul>
            {item.subcategories.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
