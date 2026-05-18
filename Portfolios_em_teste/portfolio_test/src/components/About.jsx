import { ABOUT } from '../data'
import styles from './About.module.css'

export default function About() {
  // Quebra parágrafos por linha dupla
  const paragraphs = ABOUT.trim().split(/\n\s*\n/)

  return (
    <section id="sobre-mim" className={styles.section}>
      <div className="reveal">
        <h1 className="section-title">Sobre Mim</h1>
      </div>

      <div className={`${styles.content} reveal`}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p.trim()}</p>
        ))}
      </div>
    </section>
  )
}
