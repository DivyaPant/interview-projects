import React from "react";
import noEvents from '../../assets/images/no-events-selected.png';

const NoEventsSelected = ()=>{
    return (
        <div>
            <picture>
                <img src={noEvents} alt="no events"/>
            </picture>
            <p>No events selected.</p>
        </div>
    )
};

export default NoEventsSelected;