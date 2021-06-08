import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from 'components/navbar'

export default function Home() {

  return (
    <body>
      <section className="min-h-screen flex items-stretch text-white ">
        <div className="px-6  lg:flex w-full hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: "url(https://source.unsplash.com/user/erondu" }}>
          <div className="absolute bg-black opacity-30 inset-0 z-0"></div>
          <Navbar />
          <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-between space-x-4">
            <span>
              <img style={{ height: "100px" }} src="https://www.ipn.mx/assets/files/avisos/img/2020/CGSI/logo-poli-blanco.png"></img>
            </span>
            <span>
              <img style={{ height: "100px" }} src="https://www.escom.ipn.mx/images/logoESCOMBlanco.png"></img>
            </span>
          </div>
          <div className="w-full px-24 z-10 items-center flex flex-col">
            <h1 className="text-4xl font-semibold text-left tracking-wide">Operaciones básicas con señales de audio</h1>
            <p className="text-xl mt-4">Osmar Pérez Bautista</p>
            <p className="text-xl">Brandon Gómez Mérida</p>
            <p className="text-xl">Luis Ángel Hernández Ceciliano</p>
            <br/>
            <p className="text-xl">Profesora: Jacqueline Arzate Gordillo</p>
            <p className="text-xl">Grupo: 3CV16</p>
          </div>
        </div>
      </section>
    </body >
  )
}
