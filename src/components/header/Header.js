import { NavLink } from "react-router-dom"
import './style.css'
export default function Header(){
    return(
        <>
        <div className="header">
            <NavLink to={`/`}> Home</NavLink>
            <NavLink to={`/about`}> About </NavLink>
            <NavLink to={`/contact`}> Contact</NavLink>
        </div>
        </>
    )
}