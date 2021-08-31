/* eslint-disable react-hooks/exhaustive-deps */ /* temp */
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Button, Dropdown, Modal, Spinner, Table } from "react-bootstrap";

import useFetch from "../../hooks/useFetch";

const FlightsModal: FC<FlightsModalProps> = ({ airport, toggleModalHandler }) => {
    const endDate = moment().unix();
    const [startDate, setStartDate] = useState(moment().subtract(1, 'd').unix())
    const [dropdownTitle, seDropdownTitle] = useState('Last 24 hours')


    const arrivalFlights = useFetch(`https://opensky-network.org/api/flights/arrival?airport=${airport.ICAO}&begin=${startDate}&end=${endDate}`);
    const departureFlights = useFetch(`https://opensky-network.org/api/flights/departure?airport=${airport.ICAO}&begin=${startDate}&end=${endDate}`);

    const setStartDateHandler = (days: number, title: string) => {
        seDropdownTitle(title);
        setStartDate(moment().subtract(days, 'd').unix())
    }

    useEffect(() => {
        arrivalFlights.refetch()
        departureFlights.refetch()
    }, [startDate])

    return (
        <Modal show onHide={toggleModalHandler} animation={false} id="modalflights">
            <Modal.Header closeButton>
                <Modal.Title>{airport.location}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                            {dropdownTitle}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setStartDateHandler(1, 'Last 24 hours')}>Last 24 hours</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStartDateHandler(3, 'Last 3 Days')}>Last 3 Days</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStartDateHandler(7, 'Last 7 Days')}>Last 7 Days</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <h3>Arrival</h3>
                            {arrivalFlights.isLoading
                                ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    </div>
                                )
                                : <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>icao24</th>
                                            <th>First Seen</th>
                                            <th>Last Seen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrivalFlights.data.map(({ icao24, firstSeen, lastSeen }, index) => (
                                            <tr key={icao24 + index}>
                                                <td>{icao24}</td>
                                                <td>{moment.unix(firstSeen).format("MM/DD/YY h:mm a")}</td>
                                                <td>{moment.unix(lastSeen).format("MM/DD/YY h:mm a")}</td>
                                            </tr>))}
                                    </tbody>
                                </Table>
                            }
                        </div>

                        <div>
                            <h3>Departure</h3>
                            {departureFlights.isLoading
                                ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    </div>
                                )
                                : <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>icao24</th>
                                            <th>First Seen</th>
                                            <th>Last Seen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departureFlights.data.map(({ icao24, firstSeen, lastSeen }, index) => (
                                            <tr key={icao24 + index}>
                                                <td>{icao24}</td>
                                                <td>{moment.unix(firstSeen).format("MM/DD/YY h:mm a")}</td>
                                                <td>{moment.unix(lastSeen).format("MM/DD/YY h:mm a")}</td>
                                            </tr>))}
                                    </tbody>
                                </Table>
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModalHandler}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

interface FlightsModalProps {
    airport: {
        name: string;
        ICAO: string;
        location: string;
    },
    toggleModalHandler: () => void;
}
export default FlightsModal;
