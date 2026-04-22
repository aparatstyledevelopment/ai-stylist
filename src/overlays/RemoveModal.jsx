import { useOverlay } from '../context/OverlayContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export function RemoveModal() {
  const { modalId, modalData, closeModal } = useOverlay();
  const { toast } = useToast();
  const isOpen = modalId === 'remove-modal';
  const data = modalData || { name: 'مارال رحیمی', phone: '09103665319', orders: 8 };

  const confirm = () => {
    closeModal();
    toast('نماینده با موفقیت حذف شد');
  };

  return (
    <div
      className={`modal-backdrop${isOpen ? ' open' : ''}`}
      id="remove-modal"
      onClick={() => closeModal()}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <div className="inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
        <h3>حذف نماینده از شبکه</h3>
        <div className="sub-title">این عمل قابل بازگشت نیست</div>

        <div style={{ background: 'var(--surf)', borderRadius: 'var(--r-md)', padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: '1', textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '-0.01em' }} id="modal-name">{data.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', direction: 'ltr', textAlign: 'right', marginTop: '2px' }} id="modal-phone">{data.phone}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px' }} id="modal-stats">
              {data.orders} حواله فعال · ۱۲۴ m²
            </div>
          </div>
        </div>

        <div className="modal-consequences">
          <div className="lbl">با حذف، این اتفاقات می‌افتند:</div>
          <ul>
            <li>دسترسی نماینده به محصولاتت قطع می‌شه</li>
            <li id="modal-orders-text">
              {data.orders === 0
                ? 'نماینده از شبکه خارج می‌شود'
                : `${data.orders} حواله فعال لغو می‌شن`}
            </li>
            <li>مشتریان نماینده، محصولت رو نمی‌بینن</li>
          </ul>
        </div>

        <div className="modal-hint">
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--info-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', fontSize: '12px', flexShrink: '0' }}>
            ?
          </div>
          <div style={{ flex: '1' }}>
            به جای حذف، می‌تونی غیرفعال کنی
            <br />
            <span style={{ opacity: '.7' }}>تا بعداً دوباره اضافه‌اش کنی</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn outline" onClick={closeModal}>انصراف</button>
          <button className="btn danger" onClick={confirm}>حذف همیشگی</button>
        </div>
      </div>
    </div>
  );
}
