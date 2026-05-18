import { SKILL_GROUPS } from '../data'
import styles from './Skills.module.css'

// Mostra ícone SVG se existir, senão exibe as iniciais do nome
function SkillBadge({ skill }) {
  const initials = skill.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={styles.badge}>
      {skill.icon ? (
        <img src={skill.icon} alt={skill.name} width={50} height={50} loading="lazy" />
      ) : (
        <div className={styles.initials}>{initials}</div>
      )}
      <span>{skill.name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="reveal">
        <h1 className="section-title">Habilidades</h1>
      </div>

      {SKILL_GROUPS.map((group, gi) => (
        <div
          key={gi}
          className={`${styles.group} reveal ${gi % 2 === 0 ? 'from-right' : 'from-left'}`}
        >
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <div className={styles.grid}>
            {group.skills.map((skill, si) => (
              <SkillBadge key={si} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
