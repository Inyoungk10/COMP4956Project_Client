import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Sign in</Link>
            <Link to='/sandbox'>Sandbox</Link>
        </div>
    )
}

export default Navbar;
