import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [drinkData, setDrink] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState({ status: false, msg: "" });
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=l";
  // console.log('url:',URL);
  const fetchData = async (api) => {
    try {
      const response = await fetch(api);
      const { drinks } = await response.json();
      console.log(drinks);
      setDrink(drinks);
      setLoading(false);
      setError({ status: false, msg: "" });
      if (!drinks) {
        throw new Error("data not found");
      }
    } catch (error) {
      console.log(error.message);
      setError({
        status: true,
        msg: error.message || "something went wrong pls try after sometime"
      });
    }
  };
  useEffect(() => {
    const correctUrl = `${URL}${search}`;
    fetchData(correctUrl);
    setLoading(true);
  }, [search]);
  if (isError?.status) {
    return (
      <div>
        <h3 style={{ color: "red", textAlign: "center" }}> {isError?.msg} </h3>
      </div>
    );
  }
  return (
    <div className="App">
      <input
        type="text"
        name="search"
        value={search}
        placeholder="search here"
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />
      {loading ? (
        <div>
          <h2 style={{ textAlign: "center" }}> LOADING....! </h2>
        </div>
      ) : (
        <div className="drink-container">
          {drinkData.map((info) => {
            const {
              idDrink,
              strCategory,
              strInstructions,
              strDrinkThumb
            } = info;
            return (
              <div key={idDrink} className="each-drink">
                <h4> {strCategory} </h4>
                <img alt={strCategory} src={strDrinkThumb} width={300} />
                <p> {strInstructions} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
