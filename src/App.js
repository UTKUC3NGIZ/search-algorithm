import { useEffect, useState } from "react";
import json from "./data/data.json";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const mergeData = [];
    let idCounter = 0;
    for (const key in json) {
      for (const item in json[key].subcategories) {
        mergeData.push({
          id: idCounter,
          name: json[key].subcategories[item],
          point: 0,
        });
        idCounter++;
      }
    }
    setData(mergeData);
    setFilteredData(mergeData);
  }, []);

  useEffect(() => {
    // 
    const filtered = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, search]);
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {filteredData.map((item) => (
        <div key={item.id}>
          {item.name} - {item.point}
        </div>
      ))}
    </div>
  );
}

export default App;
