import { useState, useEffect, useRef } from "react";
import axios from 'axios';

import './Clima.css';

const Home = () => {

    const [cidade, setCidade] = useState('');
    const [tempo, setTempo] = useState(null);
    const [dias, setDias] = useState(0);
    const [show, setShow] = useState(false);

    const apiKey = '4bccb1fdfce64410889221445242606';

    const buttonRef = useRef(null);

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.key === 'Enter') {
                buttonRef.current.click();
            }
        }

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        }
    }, []);

    const getTempo = () => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}`)
            .then(response => {
                setTempo(response.data);
            })
            .catch(err => {
                alert('Erro ao obter a previsão do tempo');
                setTempo(null);
            });
            showForecast(false);
    }

    const get5dias = () => {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=5`)
            .then(response => {
                setDias(response.data);
                console.log(response.data);
            })
            .catch(err => {
                alert('Erro ao obter previsão do tempo');
                setDias(null);
            })
            showForecast(true);
    }

    const showForecast = (condicao) => {
        setShow(condicao);
    }

    const traduzirCondicao = (condicaoEmIngles) => {
        switch (condicaoEmIngles) {
            case 'Partly cloudy':
                return 'Parcialmente nublado';
            case 'Partly Cloudy':
                return 'Parcialmente nublado';
            case 'Overcast':
                return 'Nublado';
            case 'Sunny':
                return 'Ensolarado';
            case 'Clear':
                return 'Céu Limpo'
            case 'Rain':
                return 'Chuva';
            case 'Snow':
                return 'Neve';
            case 'Patchy rain nearby':
                return 'Chuva irregular nas proximidades';
            default:
                return condicaoEmIngles;
        }
    }

    return (
        <div className="current-tempo-container">
            <h1>Clima Tempo</h1>
            <input type="text" placeholder="Busque a cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
            <button onClick={getTempo} ref={buttonRef}>Mostrar Tempo</button>
            <div>
                {
                    tempo && (
                        <div className="tempo-info">
                            <div className="info">
                                <h2>{tempo.location.name}</h2>
                                <p>Temperatura: {tempo.current.temp_c} ºC</p>
                                <p>Condição: {traduzirCondicao(tempo.current.condition.text)}</p>
                                <button className="btn-5day" onClick={get5dias}>Proximos 5 dias</button>
                            </div>
                            <img src={tempo.current.condition.icon} alt='Tempo icon' />
                        </div>
                    )
                }
            </div>
            <div style={show ? {display: 'flex'}:{display:'none'}}> 
                <div  className="container-5day">
                    {
                        dias && dias.forecast.forecastday.map(dia => (
                            <div key={dia.date} className="tempo-info info-for">
                                <div className="info">
                                    <h3>{dia.date}</h3>
                                    <p>Temperatura maxima: {dia.day.maxtemp_c} ºC</p>
                                    <p>Temperatura minima: {dia.day.mintemp_c} ºC</p>
                                    <p>condição: {traduzirCondicao(dia.day.condition.text)}</p>
                                </div>
                                <img src={dia.day.condition.icon} alt="Tempo icon" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;