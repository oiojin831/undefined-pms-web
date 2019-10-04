import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  connectHits,
  connectStateResults
} from "react-instantsearch-dom";
import { formattedNow, formattedYesterday } from "../../util";
import { Link } from "@reach/router";
import "instantsearch.css/themes/algolia.css";

const searchClient = algoliasearch(
  "A7CJY50RWE",
  "2c3d43b5469dcc6b8c11c1b49447e100"
);

const Hits = ({ hits }) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      {hits
        .map((hit, i) => {
          return hit.checkInDate === formattedNow ||
            hit.checkInDate === formattedYesterday ? (
            <Link
              key={hit.objectID}
              to="../check-in-info"
              state={hit}
              style={{ paddingTop: "10px", color: "white", fontSize: "20px" }}
            >
              {hit.guestName}
            </Link>
          ) : null;
        })
        .filter(Boolean)}
    </div>
  );
};

const CustomHits = connectHits(Hits);

const Content = connectStateResults(({ searchState, searchResults }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    <CustomHits />
  ) : searchState.query ? (
    <div style={{ color: "red", textAlign: "center" }}>
      <br />
      No results has been found for {searchState.query}
    </div>
  ) : null
);

export default () => {
  return (
    <div
      style={{
        height: "45vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
        justifyContent: "flex-start"
      }}
    >
      <InstantSearch indexName="reservations" searchClient={searchClient}>
        {console.log("cutom", CustomHits === null)}
        <SearchBox
          translations={{
            placeholder: "Type your first name."
          }}
          searchAsYouType={false}
        />
        <Content />
      </InstantSearch>
      <br />
      <br />
      <Link
        style={{
          color: "white",
          fontWeight: "bold",
          paddingTop: "30px"
        }}
        to="/self-check-in/platform/dmyk-info"
      >
        I don't have confirmation code
      </Link>
    </div>
  );
};
