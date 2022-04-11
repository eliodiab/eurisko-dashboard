import image from "../../assets/Eurisko_logo.png";
import "./Header.scss";

const Header = (props) => {

    return (
        <div className="dashboardHeader">
            <div className="headerContent">
                <img src={image} alt="Eurisko Logo" />
                <div className="searchContainer">
                    {/* <label htmlFor="search">Search</label> */}
                    <input id="search" type="text" value={props.inputValue} placeholder="Search" onChange={props.onChange}/>
                </div>
                <button onClick={props.logout}>
                    Logout
                </button>
            </div>
            <div className="mobileSearchContainer">
                {/* <label htmlFor="search">Search</label> */}
                <input id="search" type="text" value={props.inputValue} placeholder="Search" onChange={props.onChange}/>
            </div>
        </div>
    )
}

export default Header;