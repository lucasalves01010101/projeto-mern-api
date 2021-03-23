import React from 'react'
import './css.css'

export default function Home(){
    return(
        <div className='container'>
            <h1>Olá, Rose Alves!</h1>
            <h2>Clique nesse botão para acessar o sistema:</h2>
            <button className='btn' type='submit'><a href="/admin/login">Acessar</a></button>
        </div>
    )
}