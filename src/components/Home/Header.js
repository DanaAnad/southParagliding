import React from 'react';
import logo from "../../assets/Logo/LOGO@2x.png";
import { slide as Menu } from 'react-burger-menu';
import "../../Header.css";
import "../../burgerMenu.css"; 

export default class Header extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }
    handleChange=(state) => {
        this.setState({
            menuOpen:state.isOpen
        })
    }
    closeMenu=()=> {
        this.setState({menuOpen: false})
      }

    render(){    
        return(
            <div className="Header">
                <div className="headerDesktop">
                    <div className="logoContainer">
                        <img className="imgLogo" src = {logo} alt = "logo"/>
                    </div>
                    <div className="navigationBar">
                        <button className = "buton" value="news" onClick ={()=> {this.props.showContent('news')}}>
                            NEWS
                        </button>
                        <button className = "buton" value="foto"  onClick={() => {this.props.showContent('foto')}}>
                            FOTO
                        </button>
                        <button className = "buton" value="video" onClick={() => {this.props.showContent('video')}} >
                            VIDEO
                        </button>
                        <button className = "buton" value="locations" onClick={() => {this.props.showContent('locatiidezbor')}}>
                            LOCURI DE ZBOR
                        </button>
                        <button className = "buton" value="rezervari" onClick={() => {this.props.showContent('rezervaricontact')}}>
                            REZERVARI
                        </button>
                    </div>
                </div>

                <div className = "mobileHeader">
                    <div className="mobileLogoContainer" style={{display: this.state.menuOpen ? 'none' : 'flex' }}>
                        <img className="imgMobileLogo" src = {logo} alt = "logo"/>
                    </div>
                    <Menu isOpen ={this.state.menuOpen}
                        onStateChange={(state) => this.handleChange(state)}
                        className="mobileMenu"> 
                    <div className="mobileMenuLogoContainer">
                        <img className="imgMobileMenuLogo" src = {logo} alt = "logo"/>
                    </div> 
                    <div className="mobileNavbar">
                        <button className = "buton"  value = "news" onClick={() => {this.props.showContent('news');this.closeMenu()}} >
                            NEWS
                        </button>
                        <button className = "buton" value="foto" onClick={() => {this.props.showContent('foto');this.closeMenu()}} >
                            POZE
                        </button>
                        <button className = "buton" value="video" onClick={() => {this.props.showContent('video');this.closeMenu()}}  >
                            VIDEO
                        </button>
                        <button className = "buton" value="locations" onClick={() => {this.props.showContent('locatiidezbor');this.closeMenu()}} >
                            LOCURI DE ZBOR
                        </button>
                        <button className = "buton" value="rezervari" onClick={() => {this.props.showContent('rezervaricontact');this.closeMenu()}} >
                            REZERVARI
                        </button>
                    </div>
                    </Menu>
                </div>

            </div>
            
        )
    }
        
}