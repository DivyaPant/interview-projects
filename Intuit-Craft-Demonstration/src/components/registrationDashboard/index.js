import React, { useEffect, useState } from "react";
import Card from "./cards";
import axios from 'axios';
import mockData from './response-data.json';
import {filteredContent} from '../../utils';
import "./index.css";
import NoEventsSelected from './noEventsSelected';


const RegistrationDashboard = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [allEventsByCategory, setAllEventsByCategory] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [maxLimitError, setMaxLimitError] = useState(false);

  useEffect(() => {
    axios.get("https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a")
      .then((response) => {
        const data = response.data;
        setFilteredData(data);
        const segregated = filteredContent(data, "event_category");
        setAllEventsByCategory(segregated);
      }).catch((error)=>{
        console.error(error);
        // Any eror screen/ toaster etc goes here!
        const data = mockData.data;
        setFilteredData(data);
        const segregated = filteredContent(data, "event_category");
        setAllEventsByCategory(segregated);
      });

      // unmouting/cleanup not required here since its an empty dependency
      // Enhancement: Can cancel the call if component unmounts
  }, []);

  const checkTimings = (current, remove = null)=>{
    const toTimestamp = (val)=>{
      const date = new Date(val);
      return date.getTime();
    }
    const currentEventStartTime = toTimestamp(current.start_time);
    const currentEventEndTime = toTimestamp(current.end_time);
    const allData = allEventsByCategory['All'];
    let arr = Array(allData.length).fill(true);
    allData.forEach(item=>{
      const startTime = toTimestamp(item.start_time);
      const endTime = toTimestamp(item.end_time);
      // If --> time does not coincide
      if(startTime > currentEventEndTime - 1 || endTime < currentEventStartTime + 1 ) {
        if(disabled[item.id - 1] !== true) arr[item.id - 1] = false;
      } else {
        if(remove) arr[item.id - 1] = false
        else arr[item.id - 1] = true
      }
    });
    setDisabled(arr)
  };

  const handleRemoveEvent = (val) => {
    val.selected = false;
    setFilteredData([...filteredData], val);
    setSelectedEvents((prev) => prev.filter((item) => item.id !== val.id));
    checkTimings(val, true);
    setMaxLimitError(false);
  };

  const handleRemoveAllSelections = ()=>{
    setSelectedEvents([]);
    setDisabled([]);
    setFilteredData(prev=> prev.map(item=> {
      item.selected = false
    return item;
    }));
  };

  const handleAddEvent = (val) => {
    if (selectedEvents.length < 3) {
      val.selected = true;
      setSelectedEvents([...selectedEvents, val]);
      setFilteredData([...filteredData], val);
      checkTimings(val);
    } else setMaxLimitError(true);
  };

  const filterData = (filter) => {
    setFilteredData(allEventsByCategory[filter]);
  };
  
  return (
    <div className="dashboard-body">
      <section className="dashboard-left-container">
        <h1>All Events</h1>
        <div className="filter-container" data-testid="filter-container">
          {Object.keys(allEventsByCategory).map(category => (
            <span
              key={category}
              className={"filter-buttons"}
              onClick={() => filterData(category)}
            >
              {category}
            </span>
          ))}
        </div>
        <span className={maxLimitError ? 'error' : 'info'}>
          ({maxLimitError ? 'You can select a max of 3 events.' : '3 events max.'})
          </span>
        <div className="dashboard-left-body" data-testid = "card-container-all">
          {filteredData.map((item, i) => (
            <Card
              disabled={disabled[item.id - 1]}
              displayData={item}
              onButtonClick={handleAddEvent}
              displayButton={"add"}
              key={i}
              selectedEvents={selectedEvents}
            />
          ))}
        </div>
      </section>
      <section className="dashboard-right-container">
        <h1>Selected Events</h1>
        {selectedEvents.length > 0 && 
        <span className="remove-all" onClick={handleRemoveAllSelections}
        data-testid="remove-all-button"
        >Remove All</span>
        }
        
        <div className="dashboard-right-body" data-testid = "card-container-selected">
          {selectedEvents.length > 0 ?
          <>
          {selectedEvents.map((item, i) => (
            <Card
              disabled={false}
              displayData={item}
              onButtonClick={handleRemoveEvent}
              displayButton={"remove"}
              key={i}
            />
          ))}
          <button className="registration-button">Register</button>
          </> : 
          <NoEventsSelected/>
          }
        </div>
      </section>
    </div>
  );
};

export default RegistrationDashboard;
