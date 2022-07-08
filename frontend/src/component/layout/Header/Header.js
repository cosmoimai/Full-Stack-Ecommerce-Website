
import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png"
import { Link } from 'react-router-dom'

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    searchIconMargin: "0.5vmax",
    profileIconMargin: "0.5vmax",
    profileIconUrl: "/login",
    profileIconColor: "black",
    searchIconColor: "black",
    cartIconColor: "black",
    profileIconColorHover: "tomato",
    searchIconColorHover: "tomato",
    cartIconColorHover: "tomato",
    cartIconMargin: "1vmax",
}

const Header = () => {
        console.log("Header Loaded")
        return <Router><ReactNavbar {...options} /></Router> 
};
export default Header