import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Sign in</Link>
            <Link to='/boxes'>Boxes</Link>
            <Link to='/room_page'>Rooms</Link>
            <Link to='/sandbox'>Sandbox</Link>
            <Link to='/addbox'>Create Box</Link>
        </div>
    )
}

export default Navbar;
