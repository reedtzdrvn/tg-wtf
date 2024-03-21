import { useEffect, useState } from "react";

import axios from "../../axios.js";
import CardItem from "../CardItem/CardItem";
import Preloader from "../errors/Preloader.js";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsBySearchTerm, setItemsBySearchTerm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setItemsBySearchTerm(
      items.filter((item) => item.name.startsWith(searchTerm))
    );
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get("/items")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setItemsBySearchTerm(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="page mx-[8.5%] mt-[20px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />

          <span className="block my-[10px] font-[Manrope] text-[18px] font-semibold">
            Results:
          </span>

          <div
            className={
              !(itemsBySearchTerm.length === 0)
                ? "grid grid-cols-2 gap-[8px]"
                : ""
            }
          >
            {!(itemsBySearchTerm.length === 0) ? (
              itemsBySearchTerm.map((el) => (
                <CardItem
                  itemId={el._id}
                  title={el.name}
                  price={el.price}
                  image={el.photos[0]}
                  //   isFavorite={favorites[index]}
                  isAvailable={el.sizes.length === 0 ? false : true}
                  key={el._id}
                />
              ))
            ) : (
              <div className="ml-[20px] font-[Manrope] font-light text-gray-400 text-[22px]">
                Nothing to show &#128531;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
