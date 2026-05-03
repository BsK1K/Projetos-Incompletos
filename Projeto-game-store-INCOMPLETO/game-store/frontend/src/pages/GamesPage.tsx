import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gameService } from '../services/game.service';
import type { Game } from '../types';
import styles from './GamesPage.module.css';

export function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    gameService
      .list()
      .then(setGames)
      .catch(() => setError('Erro ao carregar jogos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.center}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1>Jogos</h1>
      <div className={styles.grid}>
        {games.map((game) => (
          <Link key={game.id} to={`/games/${game.id}`} className={styles.card}>
            {game.imageUrl ? (
              <img src={game.imageUrl} alt={game.title} className={styles.img} />
            ) : (
              <div className={styles.placeholder}>Sem imagem</div>
            )}
            <div className={styles.cardBody}>
              <h3>{game.title}</h3>
              <p className={styles.price}>
                R$ {Number(game.price).toFixed(2).replace('.', ',')}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {games.length === 0 && (
        <p className={styles.empty}>Nenhum jogo cadastrado ainda.</p>
      )}
    </div>
  );
}
