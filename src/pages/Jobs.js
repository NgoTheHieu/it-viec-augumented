import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QUERYSTR_PREFIX = "q";

export default function Jobs() {
  let user = useSelector((state) => state.user);
  let [originalJobs, setOriginalJobs] = useState([]);
  let [jobs, setJobs] = useState([]);
  let history = useHistory();
  let query = useQuery();
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

  const getData = async () => {
    let url =`https://my-json-server.typicode.com/NgoTheHieu/itviec/db`;
    console.log("url",url)                                                    
    let data = await fetch(url);
    let result = await data.json();
    setOriginalJobs(result.jobs); //This is some abserd, like the database host is like this, it just eliminates the objects in the array and make us think
  };

  const handleSearch = (e) => {
    let filteredJobs = originalJobs;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalJobs.filter(job =>
        job.title.toLowerCase().includes(keyword.toLowerCase()) //Searching for jobs that actually has the input keyword
      );
    }
    setJobs(filteredJobs);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [originalJobs]);

  return (
    <div className="App">
      <div className="search-header">
        <Container>
          <Col>
            {" "}
            <img
              className="logo-itviec"
              alt="itviec"
              src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
            />
           
          </Col>
          <Form onSubmit={handleSearch}>
            <Row className="search-form-wrapper">
              <Col xs={12} md={10}>
                <div className="search-section-wrapper">
                  <Row className="search-field-wrapper" noGutters={true}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="icon-fasearch"
                    />

                    <Col col={12}>
                      <input
                        value={keyword}
                        type="text"
                        className="search-box"
                        placeholder="Keyword skill(Java,IOS...),Job Title..."
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <button className="search-button" type="submit">
                  Search
                </button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Container>
        {/* This format allows print out number of search jobs result */}
        <div className="job-list">
          <h1>
          <h5>Hello! {user.email}</h5> 
            {jobs && jobs.length} IT job{jobs.length != 1 ? "s" : ""} in Vietnam
            for you{" "}
          </h1>
          {jobs && jobs.map(item => <JobCard job={item} key={item.id} />)}
        </div>
      </Container>
    </div>
  );
}
