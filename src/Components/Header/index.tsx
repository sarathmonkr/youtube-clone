import { FaSearch, FaVideo, FaBell, FaUserCircle } from 'react-icons/fa';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    InputGroup,
    InputGroupText,
    NavbarToggler,
    Collapse,
} from 'reactstrap';
import { useState } from 'react';
import { useSearchContext } from '../../Utils/Contexts/searchContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { setSearchValue } = useSearchContext()

    const toggle = () => setIsOpen(!isOpen);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchValue(searchText);
    }

    return (
        <Navbar color="light" light expand="md" className="header">
            <RouterNavLink to="/" className="navbar-brand">
                <NavbarBrand>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                        alt="YouTube Logo"
                        className="youtube-logo"
                    />
                </NavbarBrand>
            </RouterNavLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <InputGroup className="search-bar mx-auto">
                    <form onSubmit={handleSearchSubmit}>
                        <Input placeholder="Search" value={searchText} onChange={handleSearchChange} />
                    </form>
                    <InputGroupText onClick={() => handleSearchSubmit({ preventDefault: () => { } } as React.FormEvent<HTMLFormElement>)}>
                        <FaSearch />
                    </InputGroupText>
                </InputGroup>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#">
                            <FaVideo />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <FaBell />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <FaUserCircle />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;
