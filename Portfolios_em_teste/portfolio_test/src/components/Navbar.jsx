import { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Sobre mim',      href: '#sobre-mim' },
  { label: 'Habilidades',    href: '#skills'    },
  { label: 'Portfólio',      href: '#portfolio' },
  { label: 'Entre em contato', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      {/* ✏️ Troque o texto ou coloque um <img src="/logo.svg" /> */}
      <div className={styles.logo}>
        <span>SEU LOGO</span>
      </div>

      <button
        className={`${styles.menuToggle} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`${styles.menu} ${open ? styles.open : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
