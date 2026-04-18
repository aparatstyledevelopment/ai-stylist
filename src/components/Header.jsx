import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { BagIcon, ProfileIcon } from './icons.jsx';

export function Header() {
  const { basket } = useApp();
  const count = basket.length;
  const countLabel =
    count > 99 ? '۹۹+' : new Intl.NumberFormat('fa-IR').format(count);

  return (
    <header className="header">
      <img src="/assets/logo.svg" alt="نکست استایل" className="header__logo" />
      <div className="header__left">
        <Link to="/basket" className="header__icon" aria-label="سبد خرید">
          <BagIcon size={18} />
          {count > 0 && <span className="header__badge">{countLabel}</span>}
        </Link>
        <Link to="/profile" className="header__icon" aria-label="پروفایل">
          <ProfileIcon size={18} />
        </Link>
      </div>
    </header>
  );
}
