import { useState } from "react";
import json from "./data/data.json";

function App() {
  const [data, setData] = useState(json);
  const [search, setSearch] = useState("");

  // const mergeData = [];

  for (const key in data) {
    const filter = data[key].subcategories.filter((deneme) =>
      deneme.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filter);
    // for (const item in data[key].subcategories) {
    //   mergeData.push(data[key].subcategories[item]);
    // }
  }
  // console.log(typeof mergeData)
  //   const filteredData = data.filter((item) =>
  //   item.toLowerCase().includes(search.toLowerCase())
  // );
  // console.log(filteredData)
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {data.map((item, index) => (
        <div key={index}>
          {item.subcategories.map((deneme, index) => (
            <li key={index}>
              {item.name} -{deneme}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
