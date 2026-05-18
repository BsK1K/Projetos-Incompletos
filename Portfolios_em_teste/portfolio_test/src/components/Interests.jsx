import { INTERESTS } from '../data'
import styles from './Interests.module.css'

export default function Interests() {
  return (
    <section className={styles.section}>
      <div className="reveal">
        <h1 className="section-title">Em constante aprendizado</h1>
      </div>

      <div className={styles.list}>
        {INTERESTS.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} reveal ${i % 2 === 0 ? 'from-right' : 'from-left'}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
