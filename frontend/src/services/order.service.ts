import api from "../api/axios"

export const getOrder = async () =>{
    const {data} = await api.get('/detalles/')
    return data
}

