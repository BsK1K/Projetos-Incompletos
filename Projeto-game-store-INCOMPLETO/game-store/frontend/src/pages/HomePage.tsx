import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/product.service';
import { ProductCard } from '../components/ProductCard/ProductCard';
import type { Product } from '../types';
import styles from './HomePage.module.css';

const CATEGORIES = [
  { key: 'ação', label: 'Ação' },
  { key: 'rpg', label: 'RPG' },
  { key: 'fps', label: 'FPS' },
  { key: 'terror', label: 'Terror' },
] as const;

function matchCategory(productCategory: string, slug: string): boolean {
  const c = productCategory.toLowerCase().trim();
  if (slug === 'ação') return c === 'ação' || c === 'acao' || c === 'ação';
  return c === slug || c.includes(slug);
}

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    productService
      .list()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const withDiscount = products.filter((p) => p.discountPercentage > 0);
  const carouselItems = withDiscount.length >= 3 ? withDiscount : products.slice(0, 5);
  const miniCatalog = products.slice(0, 6);

  useEffect(() => {
    if (carouselItems.length <= 1) return;
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(id);
  }, [carouselItems.length]);

  const byCategory = (slug: string) =>
    products.filter((p) => matchCategory(p.category, slug));

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Carrossel principal - jogos com desconto */}
      {carouselItems.length > 0 && (
        <section className={styles.carouselSection}>
          <div className={styles.carousel}>
            {carouselItems.map((product, i) => (
              <div
                key={product.id}
                className={`${styles.carouselSlide} ${i === carouselIndex ? styles.carouselSlideActive : ''}`}
                aria-hidden={i !== carouselIndex}
              >
                <Link to={`/product/${product.id}`} className={styles.carouselLink}>
                  <div className={styles.carouselImageWrap}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className={styles.carouselPlaceholder} />
                    )}
                    <div className={styles.carouselOverlay}>
                      <span className={styles.carouselBadge}>
                        -{product.discountPercentage}%
                      </span>
                      <h2 className={styles.carouselTitle}>{product.name}</h2>
                      <div className={styles.carouselPrices}>
                        <span className={styles.carouselOriginal}>
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className={styles.carouselFinal}>
                          R${' '}
                          {(product.price * (1 - product.discountPercentage / 100))
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {carouselItems.length > 1 && (
            <div className={styles.carouselDots}>
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === carouselIndex ? styles.dotActive : ''}`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCarouselIndex(i)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Mini catálogo - 6 jogos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Destaques</h2>
          <Link to="/products" className={styles.sectionLink}>
            Ver todos
          </Link>
        </div>
        <div className={styles.cardGrid}>
          {miniCatalog.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seções por categoria */}
      {CATEGORIES.map(({ key, label }) => {
        const list = byCategory(key);
        if (list.length === 0) return null;
        return (
          <section key={key} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{label}</h2>
              <Link
                to={`/products?category=${encodeURIComponent(key)}`}
                className={styles.sectionLink}
              >
                Ver todos
              </Link>
            </div>
            <div className={styles.cardGrid}>
              {list.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
