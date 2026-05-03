import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productService } from '../services/product.service';
import type { Product } from '../types';
import styles from './ProductsPage.module.css';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = category ? { category } : undefined;
    productService
      .list(params)
      .then((list) => {
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          setProducts(list.filter((p) => p.name.toLowerCase().includes(q)));
        } else {
          setProducts(list);
        }
      })
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, [search, category]);

  if (loading) return <div className={styles.center}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1>Produtos</h1>
      {(search || category) && (
        <p className={styles.searchInfo}>
          {category && <>Categoria: {category}</>}
          {search && category && ' · '}
          {search && <>Busca: &quot;{search}&quot;</>}
        </p>
      )}
      <div className={styles.grid}>
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className={styles.card}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className={styles.img} />
            ) : (
              <div className={styles.placeholder}>Sem imagem</div>
            )}
            <div className={styles.cardBody}>
              <h3>{product.name}</h3>
              <p className={styles.price}>
                R$ {product.price.toFixed(2).replace('.', ',')}
                {product.discountPercentage > 0 && (
                  <span className={styles.badge}> -{product.discountPercentage}%</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <p className={styles.empty}>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
