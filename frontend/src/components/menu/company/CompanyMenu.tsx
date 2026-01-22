import { Link } from 'react-router-dom'

const CompanyMenu = () => {
  return (
    <ul className="space-y-4">
      <li>
        <Link to="/dashboard" className="hover:text-blue-400">
          Panel
        </Link>
      </li>
      <li>
        <Link to="/dashboard/productos" className="hover:text-blue-400">
          Productos
        </Link>
      </li>
      <li>
        <Link to="/ventas" className="hover:text-blue-400">
          Ventas
        </Link>
      </li>
      <li>
        <Link to="/reportes" className="hover:text-blue-400">
          Reportes
        </Link>
      </li>
    </ul>
  )
}

export default CompanyMenu
