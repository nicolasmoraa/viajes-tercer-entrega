import CartWidget from './CartWidget';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
      <a className="navbar-brand" href="#">Viajes 2025</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Destinos</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Reservas</a></li>
        </ul>
        <CartWidget />
      </div>
    </nav>
  );
}

export default NavBar;
