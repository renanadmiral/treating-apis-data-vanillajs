//This function does a fetch in order to get response body from the API
const getStationsData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Something went wrong. " + err);
  }
};

//This function gets dirty line names from API data and convert into a clean one
const getLineName = (dirtyLineName) => {
  //Filtering 2 first words or single string
  const splittedWords = dirtyLineName.replace(" ", "-").split("-", 2);
  //Separating line result between single or double string
  let lineName = "unknown line";
  splittedWords.length === 2
    ? (lineName = splittedWords[0] + "-" + splittedWords[1])
    : (lineName = splittedWords[0]);
  return lineName;
};

//This function gets subway stations and list them by subway lines
const showStationsPerLine = async (url) => {
  try {
    const response = await getStationsData(url);
    const result = response.estacoes.estacao.reduce((acc, station) => {
      //Invoking previous function to get a clean line name
      let line = getLineName(station._linha);
      //Checking if there is a similar station line inside result object.
      //If not, put the station line inside of result object
      !acc[line] && (acc = { ...acc, [line]: [] });
      //Inserting station data inside station lines array
      acc[line].push({ ...station });
      return { ...acc };
    }, {});
    return console.log(result);
  } catch (err) {
    return console.log(err);
  }
};

showStationsPerLine(
  "https://private-3923c4-santandercoders809.apiary-mock.com/stations"
);
