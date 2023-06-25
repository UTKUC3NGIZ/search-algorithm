import { useEffect, useState } from "react";
import json from "./data/data.json";
import { BsSearch } from "react-icons/bs";

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
  return (
    <div className="bg-slate-300">
      <div className="w-4/5 m-auto pt-14">
        <div className="relative flex justify-end items-center">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full px-5 py-8 border-2 border-white rounded-xl outline-none md:text-2xl text-xl text-black font-bold"
            placeholder="Estetik Rinoplasti"
          />
          <BsSearch className="absolute text-3xl mr-5" />
        </div>
        <div className="mt-8 flex flex-col">
          {sortedData.map((item) => (
            <div key={item.id}>
              <h3 className="px-4 py-8 md:text-xl text-lg border-2 border-white mx-2 my-2 text-center md:text-left  text-black bg-white font-bold">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
