import Datas from "../components/hackathons/Hackathons-Data";
import NoResults from "../components/NoResults";
import { useState, React } from "react";
import { Link } from "react-scroll";
import Card from "../components/Card/Card";
import ReactPaginateComponent from "../components/ReactPaginateComponent";
const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [filteredPageNumber, setfilteredPageNumber] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("");
  const cardsPerPage = 12;

  const labels = [
    ...new Set(
      Datas.map((data) => {
        if (!data.label) return null;
        return data.label;
      })
    ),
  ].filter((label) => label);

  const filterOptions =
    selectedLabel !== "" || searchTerm !== ""
      ? Datas.filter(
        (data) =>
          (selectedLabel === "" || data.label === selectedLabel) &&
          (searchTerm === "" ||
            data.head.toLowerCase().includes(searchTerm.toLowerCase()) || data.about.toLowerCase().includes(searchTerm.toLowerCase()))
      ).map((data) => {
        let newHead = data.head.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<mark style = "background: #2769AA; color: white;">${match}</mark>`
        )
        let newAbout = data.about.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<mark style = "background: #2769AA; color: white;">${match}</mark>`
        )
        return {
          ...data,
          head: newHead,
          about: newAbout
        }
      })
      : Datas;

  const cardsVisited = pageNumber * cardsPerPage;
  const filteredCardsVisited = filteredPageNumber * cardsPerPage;

  const displayCards = filterOptions.slice(
    searchTerm !== "" ? filteredCardsVisited : cardsVisited,
    (searchTerm !== "" ? filteredCardsVisited : cardsVisited) + cardsPerPage
  );
  const pageCount = Math.ceil(filterOptions.length / cardsPerPage);

  const changePageNumber = ({ selected }) => {
    if (searchTerm !== "") {
      setfilteredPageNumber(selected);
    } else {
      setPageNumber(selected);
    }
  };

  return (
    <>
      <div className="container-landing">
        <div className="landing-page-header">
          <div className="header-details">
            <h1>Hackathons</h1>

            <p>
            Participate in various hackathons to showcase your skills & get rewarded!
            </p>

            <Link to="container" smooth={true} duration={1000}>
              <h4>Explore all</h4>
            </Link>

            <div className="search-container">
              <i className="fa fa-search search-icon"></i>
              <input
                className="search"
                text="type"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setfilteredPageNumber(0);
                }}
              />
            </div>
          </div>
        </div>
        <div className="label-container">
          <span
            className="label"
            style={
              selectedLabel === ""
                ? { color: "white", background: "orange", border: "none" }
                : {}
            }
            onClick={() => {
              setSelectedLabel("");
            }}
          >
            All
          </span>
          {labels.map((label) => {
            return (
              <span
                key={label}
                className="label"
                style={
                  selectedLabel === label
                    ? { color: "white", background: "#0093ed" }
                    : {}
                }
                onClick={() => {
                  setSelectedLabel(label);
                  setfilteredPageNumber(0);
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="container" id="container">
        <div className="align-flex">
          {displayCards.length > 0 ? (
            displayCards.map((data, indx) => (
              <Card
                image={data.image}
                alt={data.alt}
                link={data.link}
                head={data.head}
                about={data.about}
                key={indx}
              />
            ))
          ) : (
            <NoResults search={searchTerm} />
          )}
        </div>
        <ReactPaginateComponent
          pageNumber={pageNumber}
          pageCount={pageCount}
          changePage={changePageNumber}
          forcePage={searchTerm !== "" ? filteredPageNumber : pageNumber}
        />
      </div>
    </>
  );
};

export default Content;
