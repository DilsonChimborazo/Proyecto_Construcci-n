
import { Link } from 'react-router-dom'

const ClientMenu = () => {
  return (
    <ul className="space-y-4">
      <li>
        <Link to="/dashboard" className="hover:text-blue-400">
          Inicio
        </Link>
      </li>
      <li>
        <Link to="/mis-pedidos" className="hover:text-blue-400">
          Mis pedidos
        </Link>
      </li>
      <li>
        <Link to="/perfil" className="hover:text-blue-400">
          Mi perfil
        </Link>
      </li>
    </ul>
  )
}

export default ClientMenu
