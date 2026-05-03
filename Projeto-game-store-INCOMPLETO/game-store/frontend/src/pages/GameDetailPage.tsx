import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gameService } from '../services/game.service';
import type { Game } from '../types';
import styles from './GameDetailPage.module.css';

export function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    gameService
      .getById(id)
      .then(setGame)
      .catch(() => setError('Jogo não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.center}>Carregando...</div>;
  if (error || !game) return <div className={styles.error}>{error || 'Jogo não encontrado.'}</div>;

  return (
    <div className={styles.page}>
      <Link to="/games" className={styles.back}>← Voltar aos jogos</Link>
      <article className={styles.article}>
        {game.imageUrl ? (
          <img src={game.imageUrl} alt={game.title} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>Sem imagem</div>
        )}
        <div className={styles.content}>
          <h1>{game.title}</h1>
          <p className={styles.price}>
            R$ {Number(game.price).toFixed(2).replace('.', ',')}
          </p>
          {game.description && <p className={styles.desc}>{game.description}</p>}
          {game.user && (
            <p className={styles.meta}>
              Cadastrado por: {game.user.name || game.user.email}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
