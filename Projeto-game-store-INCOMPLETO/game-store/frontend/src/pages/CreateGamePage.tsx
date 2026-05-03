import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/game.service';
import styles from './CreateGamePage.module.css';

export function CreateGamePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const numPrice = parseFloat(price.replace(',', '.'));
    if (!title.trim() || Number.isNaN(numPrice) || numPrice < 0) {
      setError('Preencha título e um preço válido.');
      return;
    }
    setLoading(true);
    try {
      const game = await gameService.create({
        title: title.trim(),
        description: description.trim() || undefined,
        price: numPrice,
        imageUrl: imageUrl.trim() || undefined,
      });
      navigate(`/games/${game.id}`);
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
        : 'Erro ao criar jogo.';
      setError(msg ?? 'Erro ao criar jogo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>Novo jogo</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Título *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Nome do jogo"
          />
        </label>
        <label>
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Descrição opcional"
          />
        </label>
        <label>
          Preço (R$) *
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0,00"
            required
          />
        </label>
        <label>
          URL da imagem
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar jogo'}
        </button>
      </form>
    </div>
  );
}
