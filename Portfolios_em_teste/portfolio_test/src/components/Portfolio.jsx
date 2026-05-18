import { useState } from 'react'
import { PROJECTS } from '../data'
import styles from './Portfolio.module.css'

const FILTERS = [
  { key: 'todos',     label: 'Todos'     },
  { key: 'fullstack', label: 'Fullstack' },
  { key: 'frontend',  label: 'Frontend'  },
  { key: 'backend',   label: 'Backend'   },
]

function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      {/* Imagem — coloque em /public/projects/ */}
      <div
        className={styles.cardImage}
        style={{
          backgroundImage: project.image ? `url(${project.image})` : 'none',
          backgroundColor: project.image ? 'transparent' : 'rgba(255,255,255,0.05)',
        }}
      >
        {!project.image && (
          <span className={styles.noImage}>📁</span>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className={styles.cardLinks}>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.primary}`}>
            Ver projeto
          </a>
        ) : (
          <span /> /* placeholder para manter justify-content */
        )}
        {project.codeUrl && (
          <a href={project.codeUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.outline}`}>
            Código
          </a>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('todos')

  const filtered =
    active === 'todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active)

  return (
    <section id="portfolio" className={styles.section}>
      {/* Banner */}
      <div className={styles.banner}>
        <h1 className="section-title">Portfólio</h1>
      </div>

      <div className={styles.inner}>
        {/* Filtros */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={active === f.key ? styles.filterActive : ''}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className={styles.grid}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>Nenhum projeto nessa categoria ainda.</p>
          ) : (
            filtered.map((p, i) => <ProjectCard key={i} project={p} />)
          )}
        </div>
      </div>
    </section>
  )
}
