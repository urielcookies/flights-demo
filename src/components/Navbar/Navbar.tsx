import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import { useActiveUserUpdate } from '../../context/ActiveUserContext';
import { getCookie, writeCookie } from "../../endpoints";

const NavbarMenu = () => {
    const { push } = useHistory();
    const setActiveUserUpdate = useActiveUserUpdate()

    const hasCookie = Boolean(getCookie());
    const logout = () => {
        setActiveUserUpdate(null);
        writeCookie('token', '');
        push('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Flight Demo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to='/home'>
                        <Nav.Link as="span">Home</Nav.Link>
                    </Link>
                    {hasCookie &&
                        <Nav.Link onClick={logout} as="span">Logout</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavbarMenu;
