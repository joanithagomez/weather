import './Temperature.css';
import locationPin from './assets/map-pin.svg';

export function Temperature({temperatureK, icon, description, city}) {

    function convertToF() {
        return Math.round((temperatureK - 273.15) * 9/5 + 32);
    }

    function convertToC() {
        return Math.round(temperatureK - 273.15);
    }

    return (
        <div>
            <img src={icon} alt={description} className="Weather-icon"/>
            { temperatureK && (
                <h2>{ convertToC() } <span className="unit">&deg;C</span> <span className="divider"></span> { convertToF() } <span className='unit'>&deg;F</span></h2>
            )}
            <p className="capitalize my-0">{ description }</p>
            <p className='City'><img src={locationPin} alt="" className="Icon"/>{city}</p>
        </div>
    );
}