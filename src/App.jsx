import './App.css'
import {useState, useEffect} from 'react'

function App() {

  const [pokemones, setPokemones] = useState([])
  const [anterior, setAnterior]= useState(null)
  const [siguiente , setSiguiente]= useState(null)
  const [actual, setActual]= useState("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")


  useEffect(()=>{
    //La funcion obtenerPokemones es async (asincrona) debido a que necesita
    // poder manejar la espera de respuesta de la API de forma dinamica
    async function obtenerPokemones(){
      // inicializar la consulta con la URL necesaria obtenida de pokeapi
      // construida en base a la documentacion de la misma
      const response = await fetch (actual) 
      // obtenemos la informacion en formato bruto, saco directamente del json
      // un objeto trabajable en javascript
      const data = await response.json()
      // Para este caso en concreto, donde quiero mostrar los pokemones, los
      // extraigo del titulo results
      const results = await data.results
      // le asigno a mi estado dicho resultado (vector con pokemones)
      setPokemones(results) 
      // Aprovechando consultas sugeridas por la API para una paginacion especifica
      // en este caso para la pagina anterior (los 10 pokemones que preceden a mi consulta
      // actual)
      setAnterior(data.previous)
      //
      setSiguiente(data.next) 
    }
    // invoco la funcion anterior para que se ejecute
    obtenerPokemones()
  },[actual])

  return (
    <div className="App">
      <h1>hola mundo</h1>

      <ul>
        {pokemones.map((pokemon)=>{
          return <li>{pokemon.name}</li>
        })}
      </ul>
      {/* crear un boton que te devuelva automaticamente a la pagina */}
      {/* aplicar bootstrap a todo el proyecto */}
      {/* dividir el proyecto en componentes */}
      <button onClick={()=> anterior !==null && setActual (anterior) }>Anterior</button>
      <button onClick={()=> siguiente !==null && setActual(siguiente)}>Siguiente</button>
     
    </div>
  )
}

export default App
