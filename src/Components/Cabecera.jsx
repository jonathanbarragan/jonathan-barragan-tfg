import React, {useState} from "react"
import "./Cabecera.css";
import { Image } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
export const Cabecera =() =>{
    const [showHome, setShowHome] = useState(false);
    const handleReturnHomeClick = () => {
        // Cambiar el estado para mostrar el componente Login
        setShowHome(!showHome);
      };
    
    if(showHome === false){
        return(
            <div className="header-container">
                <Image onClick={handleReturnHomeClick} className="logo-web" src="./Assets/PNG/logo.png" />
                <div className='search-bar'>
                    <input type='text' />
                    <div className='search-bar-Icon'><SearchIcon /> </div>
                </div>
                <Image className="cart" src="./Assets/PNG/cart.png" />
                <Image className="profile" src="./Assets/PNG/profile.png" />
            </div>
        )
    }else{
        return(
            <div>
                <Cabecera />
                
            </div>
            
        )
    }
    


}