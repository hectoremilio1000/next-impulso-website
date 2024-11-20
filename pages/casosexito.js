import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Casosexito() {

  const [casosexito, setCasosexito] = useState([])
  useEffect(() => {
   const buscarCasos = async ()=>{
    try {
      const data = await axios.get("http://localhost:3333/api/successcases")
setCasosexito(data.data)
    } catch (error) {
      console.log(error)
    }
   }
   buscarCasos();
  }, [])

  console.log(casosexito)
  
  return (
    <div>Casosexito</div>
  )
}

export default Casosexito