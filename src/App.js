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
  // kelime eşleşmesi
  let splitModifiedSearch = modifiedSearch.split(" ");
  for (const key in dataFilter) {
    data[key].score = 0;
    for (let i = 0; i < splitModifiedSearch.length; i++) {
      if (
        dataFilter[key].name.some((element) =>
          splitModifiedSearch[i].includes(element)
        )
      ) {
        data[key].score += 1000;
      }
    }

    // harf uyumu

    let dataSplit = dataFilter[key].name;

    for (const searchItem of modifiedSearch) {
      for (const item of dataSplit) {
        if (item.split("").filter((word) => word === searchItem)) {
          data[key].score += 10;
        }
      }
    }

    // sıralama uyumu
    for (const item of dataSplit) {

      for (const search of modifiedSearch.split(" ")) {
        const maxLength = Math.max(search.length, item.length);
        for (let i = 0; i < maxLength; i++) {
          if (search[i] === item[i]) {
            data[key].score += 500;
          }
        }
      }
    }
  }
  const sortedData = data.sort((a, b) => b.score - a.score);
  console.log(data)
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
         className="bg-black"
      />
      {sortedData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
