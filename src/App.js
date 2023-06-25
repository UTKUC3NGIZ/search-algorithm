import { useEffect, useState } from "react";
import json from "./data/data.json";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const mergeData = [];
    let idCounter = 0;
    for (const key in json) {
      for (const item in json[key].subcategories) {
        mergeData.push({
          id: idCounter,
          name: json[key].subcategories[item],
          score: 0,
        });
        idCounter++;
      }
    }
    setData(mergeData);
  }, []);
  let dataFilter = [];
  for (const item of data) {
    const modifiedText = item.name
      .toLowerCase()
      .replace(/[öçşıüğ]/g, function (match) {
        switch (match) {
          case "ö":
            return "o";
          case "ç":
            return "c";
          case "ş":
            return "s";
          case "ı":
            return "i";
          case "ü":
            return "u";
          case "ğ":
            return "g";
          default:
            return match;
        }
      });
    dataFilter.push({ id: item.id, name: modifiedText.split(" "), score: 0 });
  }

  const modifiedSearch = search
    .toLowerCase()
    .replace(/[öçşıüğ]/g, function (match) {
      switch (match) {
        case "ö":
          return "o";
        case "ç":
          return "c";
        case "ş":
          return "s";
        case "ı":
          return "i";
        case "ü":
          return "u";
        case "ğ":
          return "g";
        default:
          return match;
      }
    });

  dataFilter.forEach((array) => {
    data[array.id].score = 0;
    array.name.forEach((word) => {
      // kelime uyumu
      if (modifiedSearch.includes(word)) {
        data[array.id].score += 100;
      }
      // harf uyumu
      // for (let i = 0; i < word.length; i++) {
      //   const character = word[i];
      //   if (modifiedSearch.includes(character)) {
      //     data[array.id].score += 10;
      //   }
      // }

      // for (let i = 0; i < modifiedSearch.length; i++) {
      //   if (modifiedSearch[i] === word[i]) {
      //     data[array.id].score += 20;
      //   }
      // }
    });
  });
  const sortedData = data.sort((a, b) => b.score - a.score);
  console.log(sortedData);
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {sortedData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
