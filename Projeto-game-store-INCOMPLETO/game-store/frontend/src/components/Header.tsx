import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import styles from './Header.module.css';

export function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const isAuth = authService.isAuthenticated();
  const user = authService.getStoredUser();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) navigate(`/products?search=${encodeURIComponent(q)}`);
    else navigate('/products');
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Game Store
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearch} role="search">
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar jogos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar produtos"
          />
          <button type="submit" className={styles.searchBtn} aria-label="Pesquisar">
            Buscar
          </button>
        </form>

        <nav className={styles.nav}>
          <Link to="/cart" className={styles.cartBtn} aria-label="Carrinho">
            Carrinho
          </Link>
          {isAuth ? (
            <>
              <span className={styles.user}>{user?.email ?? 'Usuário'}</span>
              <button
                type="button"
                className={styles.logout}
                onClick={() => {
                  authService.logout();
                  window.location.href = '/';
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.loginBtn}>
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
