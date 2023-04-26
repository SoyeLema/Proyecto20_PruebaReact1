import { useState, useEffect } from "react";
import '../MiApi.css'

const MiApi = () => {
    const [api, setApi] = useState([]);
    const [search, setSearch] = useState([]);
    const [sort, setSort] = useState('A');

    useEffect(() => {
        consumirApi();
    }, []);

    const consumirApi = async () => {
        const url = 'https://harry-potter-api.onrender.com/personajes';
        const info = await fetch(url)
        const datos = await info.json()
        setApi(datos)
        setSearch(datos)
    }

    const orden = (e) => {
        var btnx = document.getElementById("btnx");
        btnx.textContent = "";
        if (sort === 'A') {
            let ordenado = api.sort((a, b) => {
                return a.personaje < b.personaje ? -1 : a.personaje > b.personaje ? 1 : 0;
            }).splice(0);
            setApi(ordenado);
            setSort('D');
            btnx.textContent = 'Ordenar Z→A';
        }
        else if (sort === 'D') {
            let ordenado = api.sort((a, b) => {
                return b.personaje < a.personaje ? -1 : b.personaje > a.personaje ? 1 : 0;
            }).splice(0);
            setApi(ordenado);
            setSort('A');
            btnx.textContent = 'Ordenar A→Z';
        }
    }

    const inputBuscar = (e) => {
        e.preventDefault()
        if (e.target.value === "") {
            setApi(search)
        } else {
            let listaFiltrada = search.filter(m => m.personaje.toLowerCase().includes(e.target.value));
            setApi(listaFiltrada)
        }
    }

    return (
        <div className="container">
            <div className="buscar"><h3>Buscador de Personajes</h3>
                <input className='search' placeholder=' Escribe un nombre o apellido...' type="text" onChange={(e) => { inputBuscar(e) }} />
                <br />
                <button className="btn" id="btnx" onClick={(e) => { orden(e) }}>Ordenar A→Z</button>
            </div>
            <div className="grid">
                {api.map((mago) =>

                    <div key={mago.id} className="card">
                        <img src={mago.imagen} alt="imagen del mago" />
                        <div className="name">{mago.personaje}</div>
                        <div className="house">{mago.casaDeHogwarts}</div>
                    </div>

                )}
            </div>
        </div>
    )
}

export default MiApi