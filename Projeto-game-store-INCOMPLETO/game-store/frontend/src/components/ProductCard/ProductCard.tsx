import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className={variant === 'featured' ? styles.cardFeatured : styles.card}
    >
      <div className={styles.imageWrap}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>Sem imagem</div>
        )}
        {hasDiscount && (
          <span className={styles.badge}>-{product.discountPercentage}%</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.prices}>
          {hasDiscount ? (
            <>
              <span className={styles.originalPrice}>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className={styles.finalPrice}>
                R$ {finalPrice.toFixed(2).replace('.', ',')}
              </span>
            </>
          ) : (
            <span className={styles.finalPrice}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
