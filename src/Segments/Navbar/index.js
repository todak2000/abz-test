import './navbar.css';
import Logo from '../../Assets/Logo';

/* Navbar component */

function Navbar(){
    return (
        <div className='nav-div'>
            <Logo />
            <div className='nav-inner-div'>
                <a className='primary-button' href="#users"><button type='button' className='primary-button'>Users</button></a>
                <a className='primary-button' href="#signup"><button type='button' className='primary-button'>Sign up</button></a>
            </div>
        </div>
    )
}

export default Navbar;