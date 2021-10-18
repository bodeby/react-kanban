import { React } from 'react';

// Icons
import { GoMarkGithub } from 'react-icons/go';

export const Header = () => {
    return (
        <nav className="bg-light">
        <div className="container px-4">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 align-items-center">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-4 font-monospace">Bored.io</span>
                </a>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a href="https://github.com/bodeby/react-kanban" target="_blank" rel="noreferrer">
                            <GoMarkGithub className="fs-4 text-dark" />
                        </a>
                    </li>
                </ul>
            </header>
        </div>
        </nav>
    );
}