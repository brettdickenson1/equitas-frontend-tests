import "./App.css";
import { useState, useEffect } from "react";
import Launches from "./components/Launches";
import { Button, Container } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "https://api.spacexdata.com/v4/launches/query";

  function getQueryBody(pageNumber) {
    return {
      query: {
        upcoming: false,
        success: true,
      },
      options: {
        page: pageNumber,
        select: {
          id: 1,
          name: 2,
          links: 3,
          date_utc: 4,
          flight_number: 5,
        },
        populate: [
          {
            path: "rocket",
            select: {
              id: 1,
              name: 2,
              type: 3,
              description: 4,
              height: 5,
              diameter: 6,
              mass: 7,
              flickr_images: 8,
            },
          },
          {
            path: "crew",
            select: {
              id: 1,
              name: 2,
              agency: 3,
              image: 4,
            },
          },
          {
            path: "payloads",
            select: {
              id: 1,
              name: 2,
              type: 3,
              orbit: 4,
              reference_system: 5,
              regime: 6,
            },
          },
          {
            path: "capsules",
            select: {
              id: 1,
              type: 2,
              status: 3,
              serial: 4,
            },
          },
          {
            path: "launchpad",
            select: {
              id: 1,
              name: 2,
              full_name: 3,
              locality: 4,
              region: 5,
              latitude: 6,
              longitude: 7,
              details: 8,
            },
          },
        ],
        sort: {
          flight_number: "desc",
        },
      },
    };
  }

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getQueryBody(pageNumber)),
      });

      if (!response.ok) {
        console.log("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchData(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    fetchData(currentPage - 1);
  };

  const firstPage = () => {
    setCurrentPage(1);
    fetchData(1);
  };

  const lastPage = () => {
    setCurrentPage(19);
    fetchData(19);
  };

  const buttonStyles = {
    fontSize: 12,
    height: 30,
  };

  return (
    <div className="container">
      <Container>
        <p className="totalLaunches">Total Launches: {data["totalDocs"]}</p>
        {data["docs"] ? (
          <div className="innerContainer">
            <Launches launches={data["docs"]} />
            <p
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 20,
                margin: 10,
                float: "right",
              }}
            >
              Page {data["page"]} / {data["totalPages"]}{" "}
            </p>
            <div className="buttonContainer">
              <Button
                style={buttonStyles}
                variant="contained"
                onClick={firstPage}
                disabled={currentPage === 1}
              >
                <SkipPreviousIcon />
              </Button>
              <Button
                style={buttonStyles}
                variant="contained"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Prev Page
              </Button>
              <Button
                style={buttonStyles}
                variant="contained"
                onClick={nextPage}
                disabled={currentPage === data["totalPages"]}
              >
                Next Page
              </Button>
              <Button
                style={buttonStyles}
                variant="contained"
                onClick={lastPage}
                disabled={currentPage === data["totalPages"]}
              >
                <SkipNextIcon />
              </Button>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </Container>
    </div>
  );
}
export default App;
