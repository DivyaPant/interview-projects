# Sports Event Registration

The Sports Event Registration App is a single Page React application that enables users to register for various sports events. The app displays a list of available events, and users can register for events by clicking the "Add" button. 
The selected events are shown in a separate list on the right-hand side of the screen.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [App Design and Structure](#app-design)
- [Assumptions](#assumptions)
- [Features](#features)
- [Testing](#testing)

## Getting Started

Follow these steps to set up and run the app in your local.

### Prerequisites

Node.js

npm

### Installation

npm install

npm start

Your site should now be running at `http://localhost:3000/`.

## App Design and Structure

### Folder Structure 

```
	|_ root folder
	  |_ package.json (Includes dev dependencies and scripts for env based build commands.)
	  |_ public (Application build)
	  |_ README.md
	  |_ src (Includes development code)
	  	|_ assets (images, etc)
		|_ components (Re-usable jsx components, css and unit tests file)
            |_ registrationDashboard/index (point of entry for the UI)
		|_ index.css (global css file)
		|_ utils (generic/re-usable functions of the application)
```
Each page on the UI has its own folder which should have all the associated components rendered on the UI. Some components and functions that are being used at multiple places can be put into the common components folder and utils file respectively.

### Dependencies
React v18

Axios for api calls

Jest and React testing library for unit testing.

## Assumptions

1. The user is either logged in or does not require login.
2. They cannot participate in more than 3 events.
3. They cannot participate in events that have conflicting timimgs but are free to choose events which have consecutive times. Eg - 1-2pm and 2-3pm.  

## Features

1. Cards on the left side displays a list of all the available events. User can select upto 3 events.
2. User can click on the Add button on the card to add it to his selected events list. 
3. Once the user selects, the event and any other events with conflicting time are disabled and gives a message when hovered.
4. The selected events show a green tick at the top right corner.
5. Filters are available (dynamically mapped) for all the available sports category. A user can click on any filter to see the cards for that event. Multi select is not available right now. 
6. There is a list of selected events separately and is being shown on the right side of the screen. 
7. A max of 3 events can be selected at once and upon any clicks after that an error message is displayed. 
8. There is a remove button on the selected cards where they can de register from the event. 
9. There is a Remove All button to remove all the events at once.
10. When there are no events registered by the user then the section, No Events  Selected will appear on right side. 
11. There is a register button that will make the final call for event registration.

## Testing

The project uses Jest as testing framework with React testing library for React component testing. 
Each folder has its own test file/files. 

To run the tests use command below - 

npm run unitTests

For coverage report - 

npm run unitTests-coverage

## License

This project is licensed
