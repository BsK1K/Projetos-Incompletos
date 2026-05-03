import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartService } from '../services/cart.service';
import type { Cart } from '../types';
import styles from './CartPage.module.css';

export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  function loadCart() {
    setError('');
    cartService
      .getCart()
      .then(setCart)
      .catch((e) => setError(e.response?.data?.error ?? 'Erro ao carregar carrinho.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadCart();
  }, []);

  function handleUpdateQuantity(productId: string, quantity: number) {
    setUpdatingId(productId);
    cartService
      .updateQuantity(productId, quantity)
      .then(setCart)
      .catch((e) => setError(e.response?.data?.error ?? 'Erro ao atualizar.'))
      .finally(() => setUpdatingId(null));
  }

  function handleRemove(productId: string) {
    setUpdatingId(productId);
    cartService
      .removeItem(productId)
      .then(setCart)
      .catch((e) => setError(e.response?.data?.error ?? 'Erro ao remover.'))
      .finally(() => setUpdatingId(null));
  }

  if (loading) return <div className={styles.center}>Carregando carrinho...</div>;
  if (error && !cart) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1>Carrinho</h1>
      {error && <div className={styles.errorBanner}>{error}</div>}

      {cart && cart.items.length === 0 && (
        <div className={styles.empty}>
          <p>Seu carrinho está vazio.</p>
          <Link to="/products" className={styles.link}>
            Ver produtos
          </Link>
        </div>
      )}

      {cart && cart.items.length > 0 && (
        <>
          <ul className={styles.list}>
            {cart.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Link to={`/product/${item.productId}`} className={styles.itemImage}>
                  {item.productImageUrl ? (
                    <img src={item.productImageUrl} alt={item.productName} />
                  ) : (
                    <span>Sem imagem</span>
                  )}
                </Link>
                <div className={styles.itemInfo}>
                  <Link to={`/product/${item.productId}`} className={styles.itemName}>
                    {item.productName}
                  </Link>
                  <div className={styles.itemPrices}>
                    <span className={styles.unitPrice}>
                      R$ {item.unitPriceAfterDiscount.toFixed(2).replace('.', ',')} cada
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className={styles.discount}>-{item.discountPercentage}%</span>
                    )}
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={updatingId === item.productId || item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        disabled={updatingId === item.productId}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.productId)}
                      disabled={updatingId === item.productId}
                    >
                      Remover
                    </button>
                  </div>
                </div>
                <div className={styles.itemTotal}>
                  R$ {item.lineTotal.toFixed(2).replace('.', ',')}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ {cart.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {cart.totalDiscount > 0 && (
              <div className={styles.summaryRow}>
                <span>Desconto</span>
                <span className={styles.discount}>- R$ {cart.totalDiscount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>R$ {cart.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <Link to="/products" className={styles.continueLink}>
            Continuar comprando
          </Link>
        </>
      )}
    </div>
  );
}
