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
  console.log(data)

  useEffect(() => {
    let dataAyirma = [];
    for (const key in data) {
      let modifiedWord = data[key].name.toLowerCase().replace(/ö/g, "o");
      modifiedWord = modifiedWord.replace(/ı/g, "i");
      modifiedWord = modifiedWord.replace(/ğ/g, "g");
      modifiedWord = modifiedWord.replace(/ü/g, "u");
      modifiedWord = modifiedWord.replace(/ç/g, "c");
      modifiedWord = modifiedWord.replace(/ş/g, "s");
      dataAyirma.push(modifiedWord);
    }

    let searchAyirma = search.toLowerCase().replace(/ö/g, "o");
    searchAyirma = searchAyirma.replace(/ı/g, "i");
    searchAyirma = searchAyirma.replace(/ğ/g, "g");
    searchAyirma = searchAyirma.replace(/ü/g, "u");
    searchAyirma = searchAyirma.replace(/ç/g, "c");
    searchAyirma = searchAyirma.replace(/ş/g, "s");
    let yeniSearch = searchAyirma.split(/\b/);

    let deneme = [];
    for (const key in dataAyirma) {
      const dataFilter = dataAyirma[key].split(/\s+|\p{P}/u);
      const dataFilterNew = dataFilter.filter((element) => element !== "");


      deneme.push(dataFilterNew);
    }

  }, [data, search]);
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {/* {filteredData.map((item) => (
        <div key={item.id}>
          {item.name} - {item.point}
        </div>
      ))} */}
    </div>
  );
}

export default App;
