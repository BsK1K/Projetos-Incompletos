import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/product.service';
import { cartService } from '../services/cart.service';
import { reviewService } from '../services/review.service';
import { authService } from '../services/auth.service';
import type { Product, ProductReviews } from '../types';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartQty, setCartQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    Promise.all([
      productService.getById(id),
      reviewService.listByProduct(id),
    ])
      .then(([prod, rev]) => {
        setProduct(prod);
        setReviews(rev);
      })
      .catch(() => setError('Produto não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    if (!id || product?.stock === 0) return;
    if (!authService.isAuthenticated()) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    setAddingToCart(true);
    cartService
      .addItem(id, cartQty)
      .then(() => navigate('/cart'))
      .catch((err) => setError(err.response?.data?.error ?? 'Erro ao adicionar ao carrinho.'))
      .finally(() => setAddingToCart(false));
  }

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setReviewError('');
    setSubmittingReview(true);
    reviewService
      .create(id, reviewForm.rating, reviewForm.comment || undefined)
      .then(() => reviewService.listByProduct(id).then(setReviews))
      .catch((err) => setReviewError(err.response?.data?.error ?? 'Erro ao enviar avaliação.'))
      .finally(() => setSubmittingReview(false));
  }

  if (loading) return <div className={styles.center}>Carregando...</div>;
  if (error || !product) return <div className={styles.error}>{error || 'Produto não encontrado.'}</div>;

  const priceAfterDiscount = product.price * (1 - product.discountPercentage / 100);
  const isAuth = authService.isAuthenticated();

  return (
    <div className={styles.page}>
      <Link to="/products" className={styles.back}>
        ← Voltar aos produtos
      </Link>
      <article className={styles.article}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>Sem imagem</div>
        )}
        <div className={styles.content}>
          <h1>{product.name}</h1>
          <p className={styles.meta}>
            {product.category} · {product.platform}
          </p>
          <div className={styles.prices}>
            {product.discountPercentage > 0 ? (
              <>
                <span className={styles.oldPrice}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className={styles.price}>
                  R$ {priceAfterDiscount.toFixed(2).replace('.', ',')}
                </span>
                <span className={styles.badge}>
                  -{product.discountPercentage}%
                </span>
              </>
            ) : (
              <span className={styles.price}>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          {product.description && (
            <p className={styles.desc}>{product.description}</p>
          )}
          <p className={styles.stock}>
            Estoque: {product.stock > 0 ? product.stock : 'Indisponível'}
          </p>

          {product.stock > 0 && (
            <form className={styles.addToCartForm} onSubmit={handleAddToCart}>
              <label className={styles.qtyLabel}>
                Quantidade
                <input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={cartQty}
                  onChange={(e) => setCartQty(Number(e.target.value) || 1)}
                  className={styles.qtyInput}
                />
              </label>
              <button type="submit" className={styles.addToCartBtn} disabled={addingToCart}>
                {addingToCart ? 'Adicionando...' : 'Adicionar ao carrinho'}
              </button>
            </form>
          )}
        </div>
      </article>

      {/* Avaliações */}
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Avaliações</h2>
        {reviews && (
          <>
            <div className={styles.reviewsSummary}>
              <span className={styles.averageRating}>
                {reviews.averageRating > 0
                  ? reviews.averageRating.toFixed(1).replace('.', ',')
                  : '—'}
              </span>
              <span className={styles.stars}>
                {'★'.repeat(5)}
              </span>
              <span className={styles.totalReviews}>
                ({reviews.totalReviews} {reviews.totalReviews === 1 ? 'avaliação' : 'avaliações'})
              </span>
            </div>

            {isAuth && (
              <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
                <h3>Deixe sua avaliação</h3>
                {reviewError && <div className={styles.reviewError}>{reviewError}</div>}
                <label>
                  Nota (1 a 5)
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm((r) => ({ ...r, rating: Number(e.target.value) }))}
                    className={styles.ratingSelect}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Comentário (opcional)
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((r) => ({ ...r, comment: e.target.value }))}
                    rows={3}
                    className={styles.commentInput}
                    placeholder="O que você achou?"
                  />
                </label>
                <button type="submit" disabled={submittingReview}>
                  {submittingReview ? 'Enviando...' : 'Enviar avaliação'}
                </button>
              </form>
            )}

            <ul className={styles.reviewList}>
              {reviews.reviews.length === 0 ? (
                <li className={styles.noReviews}>Nenhuma avaliação ainda.</li>
              ) : (
                reviews.reviews.map((rev) => (
                  <li key={rev.id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewStars}>
                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                      </span>
                      <span className={styles.reviewUser}>
                        {rev.user?.name || rev.user?.email || 'Anônimo'}
                      </span>
                      <span className={styles.reviewDate}>
                        {new Date(rev.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {rev.comment && <p className={styles.reviewComment}>{rev.comment}</p>}
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
