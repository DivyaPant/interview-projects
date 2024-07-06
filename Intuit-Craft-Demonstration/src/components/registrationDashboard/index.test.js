import RegistrationDashboard from './index';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import mockedRes from './response-data.json';
import { render, act, screen, fireEvent, waitFor } from "@testing-library/react";


// Mock Axios
jest.mock('axios');

describe('Registration Dashboard', ()=>{

    beforeEach(async ()=>{
        await act(async ()=> {
            await axios.get.mockImplementationOnce(() => Promise.resolve(mockedRes));
            render(<RegistrationDashboard/>)
        });
    })

    it('Renders Dashboard correctly', ()=>{
        expect(screen).toBeTruthy();
    });

    it("Tests if headings rendered", ()=>{
        expect(screen.getByText("All Events")).toBeInTheDocument();
        expect(screen.getByText("Selected Events")).toBeInTheDocument()
    });

    it("Checks if all filters are visible", async ()=>{
        await waitFor(()=>{
            const filterContainer = screen.getByTestId('filter-container');
            expect(filterContainer.children).toHaveLength(4);
        });
        expect(screen.getByText('Athletics')).toBeInTheDocument();
        expect(screen.getByText('Swimming')).toBeInTheDocument();
        expect(screen.getByText('Boxing')).toBeInTheDocument();
        expect(screen.getByText('All')).toBeInTheDocument();
    });

    it("Checks if all the cards rendered", async ()=>{
        await waitFor(()=>{
            const cardContainer = screen.getByTestId('card-container-all');
            expect(cardContainer.children).toHaveLength(mockedRes.data.length);
        });
    });

    it("Checks if right side rendered", ()=>{
        // image
        expect(screen.getByAltText('no events')).toBeInTheDocument();
        //text
        expect(screen.getByText('No events selected.')).toBeInTheDocument();
    });

    // Test click functionalities
    it("Checks if clicking on filters displays correct data", ()=>{
        const displayedEvents = screen.getByTestId('card-container-all').children;
        const all = screen.getByText('All');
        const athletics = screen.getByText('Athletics');
        const swimming = screen.getByText('Swimming');
        const boxing = screen.getByText('Boxing');
        fireEvent.click(all);
        expect(displayedEvents).toHaveLength(10);
        fireEvent.click(athletics);
        expect(displayedEvents).toHaveLength(4);
        fireEvent.click(swimming);
        expect(displayedEvents).toHaveLength(3);
        fireEvent.click(boxing);
        expect(displayedEvents).toHaveLength(3);
    });

    it("Checks if clicking on register button selects it", ()=>{
        const selectedCards = screen.getByTestId('card-container-selected');
        expect(selectedCards.children).toHaveLength(1); //button
        const addBtn = screen.getAllByRole('button', {name: /add/i})[0];
        fireEvent.click(addBtn);
        expect(selectedCards.children).toHaveLength(2); // card + button
        expect(screen.getAllByAltText('selected-icon')[0]).toBeVisible();
    });

    it("Checks if events with conflicting timings are disabled", async ()=>{
        const selectedCards = screen.getByTestId('card-container-selected');
        expect(selectedCards.children).toHaveLength(1); // button
        // Add an event with time 1-2pm.
        const addBtn = screen.getAllByRole('button', {name: /add/i});
        fireEvent.click(addBtn[0]);
        expect(selectedCards.children).toHaveLength(2); // card + button
        
        // Check if the 2 events with time 1:30-2:30 and 1-2pm are disabled
        expect(addBtn[0]).toHaveProperty('disabled', true)
        expect(addBtn[1]).toHaveProperty('disabled', true)
        expect(addBtn[3]).toHaveProperty('disabled', true)
        fireEvent.click(addBtn[1]); // 1:30-2:30pm
        expect(selectedCards.children).toHaveLength(2);
        fireEvent.click(addBtn[3]); // 1-2pm
        expect(selectedCards.children).toHaveLength(2);

        // Try selecting a different event and it should get added
        expect(addBtn[2]).toHaveProperty('disabled', false)
        fireEvent.click(addBtn[2]); //3-4pm
        expect(selectedCards.children).toHaveLength(3);
    });

    it("Checks if max 3 events can be added", ()=>{
        const selectedCards = screen.getByTestId('card-container-selected');
        expect(selectedCards.children).toHaveLength(1); // button
        const addBtn = screen.getAllByRole('button', {name: /add/i});
        fireEvent.click(addBtn[0]);
        expect(selectedCards.children).toHaveLength(2); // card + button
        fireEvent.click(addBtn[9]);
        expect(selectedCards.children).toHaveLength(3);
        fireEvent.click(addBtn[8]);
        expect(selectedCards.children).toHaveLength(4);
        // trying to add again after 3 events are added
        fireEvent.click(addBtn[7]); 
        expect(selectedCards.children).toHaveLength(4);
    });

    it("Checks if clicking on remove buttons works fine", ()=>{
        const selectedCards = screen.getByTestId('card-container-selected');
        const addBtn = screen.getAllByRole('button', {name: /add/i});
        fireEvent.click(addBtn[0]);
        expect(selectedCards.children).toHaveLength(2); // card+button
        expect(addBtn[0]).toHaveProperty('disabled', true)
        expect(addBtn[1]).toHaveProperty('disabled', true)
        expect(addBtn[3]).toHaveProperty('disabled', true)
        const removeBtn = screen.getAllByRole('button', {name: /remove/i})[0];
        fireEvent.click(removeBtn);
        expect(selectedCards.children).toHaveLength(1); //button
        expect(addBtn[0]).toHaveProperty('disabled', false)
        expect(addBtn[1]).toHaveProperty('disabled', false)
        expect(addBtn[3]).toHaveProperty('disabled', false)
    });

    it('Checks if Remove All works', ()=>{
        // First add 2 events
        const selectedCards = screen.getByTestId('card-container-selected');
        const addBtn = screen.getAllByRole('button', {name: /add/i});
        fireEvent.click(addBtn[0]);
        fireEvent.click(addBtn[8]);
        expect(selectedCards.children).toHaveLength(3); // cards +button
        const removeAllBtn = screen.getByTestId('remove-all-button');
        fireEvent.click(removeAllBtn);
        expect(selectedCards.children).toHaveLength(1);
    });

    it("Checks failed response", async ()=>{
        await act(async ()=> {
            await axios.get.mockImplementationOnce(() => Promise.reject({}));
            render(<RegistrationDashboard/>)
        });
        // Any rendered text for error can be added here
    })
    
});