import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const choose = (gender) => {
    setUser({ gender });
    navigate('/home', { replace: true });
  };

  return (
    <div className="onboarding">
      <h1 className="onboarding__title">جنسیت شما چیست؟</h1>
      <div className="onboarding__options">
        <button
          type="button"
          className="onboarding__option"
          onClick={() => choose('female')}
        >
          زن
        </button>
        <button
          type="button"
          className="onboarding__option"
          onClick={() => choose('male')}
        >
          مرد
        </button>
      </div>
    </div>
  );
}
