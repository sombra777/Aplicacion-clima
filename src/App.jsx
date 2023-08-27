import { useState } from "react";

function App() {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '574a79ec21258f7fd08833e0e3964e2e'
  const difKelvin = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setdataClima] = useState(null)

  const handleCambioCiudad = (e)=> {
      setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setdataClima(data)
    } catch (error) {
      console.error('Ocurrio un problema: ', error)
    }
  }

  return (
    <div className="container">
      <h1>Aplicacion del clima</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type="submit">Buscar</button>
      </form>

{
  dataClima && (
    <div>
      <h2>{dataClima.name}</h2>
      <p>temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} °C</p>
      <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
      <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
    </div>
  )
}

    </div>
  );
}

export default App;
