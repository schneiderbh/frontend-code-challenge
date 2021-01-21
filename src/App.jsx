import React, { useEffect } from 'react';
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";


const App = () => {
    // Defino los states que usare en la app 
    const [result, setResult] = React.useState([]); // almacenar todos los pokemones
    const [pokemon, setPokemon] = React.useState([]); // resultado de los filtros
    const [load, setLoader] = React.useState(true); // loader

    useEffect(() => {
        fetch(URL_PATH)
        .then((resp)=> resp.json())
        .then((data) => {
            // cuando ttengo la respuesta ejecuto las funciones para modificar los states del resultado y el loader
            setResult(data)
            setLoader(false)
        })
        
    });

    const filterPokemon = (e) => {
        // valida que el input tenga texto para hacer el filtrado
        if(e.target.value !== ""){
            // filtrado por tipo de pokemon
            const pokemonType = result.map(item=>({
                ...item, Type: item.Types.filter(type=> type.includes(e.target.value))
            })).filter(element => element.Type.length > 0)
            // filtrado por nombre de pokemon
            const pokemonName = result.filter((item)=> item.Name.includes(e.target.value))
            // Valido que si no hay matches con el nombre, filtre por tipo
            if(pokemonName.length === 0) {
                setPokemon(pokemonType)
            }
            else {
                setPokemon(pokemonName)
            }
        }
        // en caso de que se borre todo el valor del input, se borra el state con los resultados filtrados
        else {
            setPokemon([])
        }
    };

    const sortPokemons = (e) => {
        // valido si el checkbox esta seleccionado, acomodo por MaxCP sino en orden alfabetico
        if(e.target.checked) {
            setPokemon(pokemon.sort((a,b) => b.MaxCP - a.MaxCP))
        }
        else {
            setPokemon(pokemon.sort((a, b) => a.Name.localeCompare(b.Name)))
        }
    }

    return <>
    <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" onClick ={sortPokemons} />
        <small>
            Maximum Combat Points
        </small>
    </label>
    {/* Agrego los listeners de los eventos al template y las funciones que ejecutaran */ }
    <input type="text" className="input" placeholder="Pokemon or type" onChange={filterPokemon} />
    {/* Valido si el load esta en true, renderea el loader sino lo elimina */}
    {load === true ? <div className="loader"></div> : null}
    {/* Mappeo el resultado de los filtros de busqueda y le hago un slice para solo mostrar los primeros 4 resultados */}
    <ul className="pokemon-list">
        {pokemon.length > 0 ? pokemon.slice(0, 4).map((item)=> {
            return(<li key={item.Name}>
                <img src={item.img} alt="" />
                <div className="info">
                    <h1>{item.Name}</h1>
                    {item.Types.map((type)=> <span className={`type ${type.toLowerCase()}`}>{type}</span>)}
                </div>
            </li>)}) : <li>No results</li>
        }
        </ul>
</>};
// 

{/* <li key={item.Name}>{item.Name}</li>})  */}


export default App;
