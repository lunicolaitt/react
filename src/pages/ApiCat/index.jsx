import { useEffect, useState } from 'react'
import './style.css'
import Card from '../../components/Card'

export default function ApiCat() {
    const [ conteudo, setConteudo ] = useState(<>Carregando</>)

    async function getCharacters() {
        const reqOptions = {
            method: "GET",
            redirect: "follow"
        }

        const response = await fetch(
            "https://thecatapi.com/",
            reqOptions
        )

        if(!response.ok){
            throw new Error("Http Error")
        }

        const apiResponse = await response.json()

        return apiResponse
    }

    async function buildCards() {
        const consulta = await getCharacters()
        
        return consulta.results.map(personagem => <Card data={personagem} />)
    }

    useEffect(() => {
        async function getConteudo() {
            setConteudo(await buildCards())
        }

        getConteudo()
    }, [])

    return (
        <div className='list-api'>
            { conteudo }
        </div>
    )   
}

