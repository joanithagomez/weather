import './styles/Temperature.css';
import { LocationOnOutlined } from '@mui/icons-material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


export function Temperature({tempF, tempC, icon, description, city, localTime}) {

    return (
        <div>
            <img src={icon} alt={description} className="weather-icon"/>

            <h2>{ tempC } <span className="unit">&deg;C</span> <span className="divider"></span> { tempF } <span className='unit'>&deg;F</span></h2>
            <p className="capitalize my-0">{ description }</p>
            <p className='info'><AccessTimeOutlinedIcon fontSize="small" className="icon"/>{ localTime }</p>
            <p className='info'><LocationOnOutlined fontSize="small" className="icon"/>{city}</p>
        </div>
    );
}