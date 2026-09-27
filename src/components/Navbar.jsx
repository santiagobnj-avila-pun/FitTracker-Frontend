function Navbar() {
    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg py-2">
                <div className="container">

                    <a className="navbar-brand d-flex align-items-center gap-2 mb-0" href="#inicio">
                        <span>FIT TRACKER</span>
                        <img
                            src="/img/mascota-navbar-reclinada.png"
                            className="navbar-mascota object-fit-contain"
                            alt=""
                            aria-hidden="true"
                        />
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navPrincipal"
                        aria-controls="navPrincipal"
                        aria-expanded="false"
                        aria-label="Abrir menú"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navPrincipal">
                        <ul className="navbar-nav ms-auto text-center gap-lg-3">
                            <li className="nav-item">
                                <a className="nav-link py-2" href="#inicio">Inicio</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link py-2" href="#rutinas">Rutinas</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link py-2" href="#ejercicios">Ejercicios</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link py-2" href="#calendario">Calendario</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link py-2" href="#progreso">Progreso</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar