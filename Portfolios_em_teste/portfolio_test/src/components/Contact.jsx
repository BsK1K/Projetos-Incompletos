import { CONTACT } from '../data'
import styles from './Contact.module.css'

export default function Contact() {
  const action = `https://formspree.io/f/${CONTACT.formspreeId}`

  return (
    <section id="contact" className={styles.section}>
      <div className="reveal">
        <h1 className="section-title">{CONTACT.title}</h1>
      </div>

      <p className={styles.description}>{CONTACT.description}</p>

      {/* Formulário via Formspree — troque o ID em src/data.js */}
      <form
        className={`${styles.form} reveal`}
        method="POST"
        action={action}
        target="_blank"
      >
        <div className={styles.field}>
          <label htmlFor="name">Nome *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Informe seu nome"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Informe seu e-mail"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="msg">Mensagem *</label>
          <textarea
            id="msg"
            name="message"
            placeholder="Digite sua mensagem aqui..."
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submit}>
          Enviar
        </button>
      </form>
    </section>
  )
}
