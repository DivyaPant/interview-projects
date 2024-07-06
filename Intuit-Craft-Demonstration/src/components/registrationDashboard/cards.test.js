import Card from './cards';
import '@testing-library/jest-dom/extend-expect';
import mockedRes from './response-data.json';
import { render, act, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

describe('Individual Card', ()=>{

    beforeEach(()=>{
        render(<Card
            disabled={false}
              displayData={mockedRes.data[0]}
              onButtonClick={()=> jest.fn()}
              displayButton={"add"}
              key={'key'}
            />)
    });

    it("Renders correctly", ()=>{
        expect(screen).toBeTruthy();
    });

    it("Displays all the data", ()=>{
        expect(screen.getByText('S')).toBeInTheDocument();
        expect(screen.getByText('Butterfly 100M')).toBeInTheDocument();
        expect(screen.getByText(/swimming/i)).toBeInTheDocument();
        // Check if date is in proper format
        expect(screen.getByText('1:00 PM - 2:00 PM')).toBeInTheDocument();
    });

    it("Button is visible", ()=>{
        expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
        expect(screen.getByRole('button')).toHaveTextContent('add');
        
    })
})