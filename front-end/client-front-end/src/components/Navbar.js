import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Sign in</Link>
        </div>
    )
}

export default Navbar;