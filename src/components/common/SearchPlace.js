import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import algoliasearch from "algoliasearch";

const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const SEARCH_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;

const algoliaClient = algoliasearch(APP_ID, SEARCH_KEY);
const algoliaSearch = algoliaClient.initIndex("usa-states");

const SearchPlace = () => {
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    if (value.length <= 3) {
      setData([]);
    } else {
      algoliaSearch.search(value).then((resp) => {
        setData(resp.hits);
      });
    }
  };

  return (
    <div className="search-place">
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ flex: 1 }}>
          <FiMapPin />
          &nbsp;Pick up
        </InputGroup.Text>
        <FormControl
          type="search"
          placeholder="Type a place"
          style={{ flex: 3 }}
          autoComplete="off"
          onChange={handleSearch}
        />
      </InputGroup>
      <ul className={data.length <= 0 ? "d-none" : ""}>
        {data.map((item) => (
          <li key={item.objectID}>
            {item.state} {item.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPlace;
