import React from "react";
import tick from '../../assets/images/tick.svg';

const Card = (props) => {
  const { displayButton, displayData, onButtonClick, disabled, selectedEvents } = props;

  const formatDate = (start, end) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let startTime = new Date(start);
    let endTime = new Date(end);
    return `${startTime.toLocaleString(
      "en-US",
      options
    )} - ${endTime.toLocaleString("en-US", options)}`;
  };
  return (
    <div className={`card-container ${disabled ? 'card-disabled' : ''}`}
    title={disabled ? 'Unavailabe : Conflict with another selected event.' : ''}
    >
     {displayData?.selected ? <img alt='selected-icon' src={tick} className="selected-icon"/> : ''} 
      <section className="card-left">
        {displayData?.event_category?.split("")[0]}
      </section>
      <section className="card-right">
        <span className="card-event-name">{displayData.event_name}</span>
        <span>({displayData.event_category})</span>
        <span>{formatDate(displayData.start_time, displayData.end_time)}</span>
        <button
          disabled={disabled}
          onClick={() => {
            onButtonClick(displayData);
          }}
        >
          {displayButton}
        </button>
      </section>
    </div>
  );
};

export default Card;
