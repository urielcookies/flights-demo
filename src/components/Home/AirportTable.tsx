import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import airports from './airportConstants';
import FlightsModal from './FlightsModal'

const AirportTable = () => {
    const [showModal, setShowModal] = useState(false)
    const [currentAirport, setCurrentAirport] = useState<AirportData>({
        name: '',
        ICAO: '',
        location: ''
    })
    const toggleModalHandler = () => {
        setShowModal(!showModal);
        if (showModal) setCurrentAirport({
            name: '',
            ICAO: '',
            location: ''
        });
    }
    const setCurrentAirportHandler = (data: AirportData) => {
        setCurrentAirport(data)
        toggleModalHandler();
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>View Flights</th>
                    </tr>
                </thead>
                <tbody>
                    {airports.map(airport => (
                        <tr key={airport.ICAO}>
                            <td>{airport.name}</td>
                            <td>{airport.location}</td>
                            <td>
                                <Button
                                    onClick={() => setCurrentAirportHandler(airport)}>
                                    View Flights
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {showModal &&
                <FlightsModal
                    airport={currentAirport as AirportData}
                    toggleModalHandler={toggleModalHandler} />
            }
        </>
    );
}

interface AirportData {
    name: string;
    ICAO: string;
    location: string;
}

export default AirportTable;
