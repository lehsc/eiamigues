import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoints } from '../../backend/index.ts'
import { Users } from '../../types'


export default function UserHome() {
    const [userData, setUserData] = useState<Users[]>()
    useEffect(() => {
        const getUsers = async () => {
            const users = await axios.get<Users[]>(endpoints.users)
            const data = users.data
            setUserData(data)
        }

        getUsers()

    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Gênero</th>
                        <th>E-amil</th>
                        <th>Senha</th>
                        <th>Perfil Anônimo</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map(c => {
                        return(
                        <tr>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.gender ? "Homem" : "Mulher"}</td>
                            <td>{c.email}</td>
                            <td>{c.pwd}</td>
                            <td>{c.anonymous ? "Sim" : "Não"}</td>
                        </tr>
                        )

                    })}

                </tbody>
            </table>
        </div>

    )

}