import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Sign in</Link>
            <Link to='/rooms'>Rooms</Link>
            <Link to='/boxes'>Boxes</Link>
            <Link to='/room_page'>RoomsPage</Link>
        </div>
    )
}

export default Navbar;
