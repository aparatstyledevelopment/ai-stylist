import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Edit, Plus, Minus, Check, ArrowUp, ArrowDown } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';

const SPECS = [
  ['سایز', '۱۰۰×۳۰'], ['بدنه', 'سرامیک'],
  ['لعاب', 'مات'],    ['کاربرد', 'کف، پله'],
  ['ضخامت', '۹ mm'],  ['هر کارتن', '۸ عدد'],
];

const TXS = [
  { dir: 'up',   type: 'ورود از کارخانه', meta: 'امروز ۱۴:۲۳ · پالت تبریز کاشی', amt: '+۵۰'  },
  { dir: 'down', type: 'خروج حواله',      meta: 'دیروز ۱۶:۱۰ · ord-b88a',         amt: '−۲۰'  },
  { dir: 'up',   type: 'ورود اولیه',      meta: '۱۴۰۵/۱/۴ · بروزرسانی گروهی',     amt: '+۱۰۰' },
  { dir: 'down', type: 'خروج حواله',      meta: '۱۴۰۵/۱/۲ · ord-a47f',             amt: '−۴'   },
  { dir: 'up',   type: 'ورود از کارخانه', meta: '۱۴۰۴/۱۲/۲۸ · پالت یزد سرام',     amt: '+۸۰'  },
  { dir: 'down', type: 'خروج حواله',      meta: '۱۴۰۴/۱۲/۲۵ · ord-77c2',           amt: '−۱۲'  },
  { dir: 'down', type: 'خروج حواله',      meta: '۱۴۰۴/۱۲/۲۰ · ord-43b1',           amt: '−۳۰'  },
];

export function TileDetailPage() {
  const { goBack, quickAdd, toast } = useLegacyActions();
  return (
    <>
      <PageTopBar
        onBack={() => goBack('warehouse')}
        title="جزئیات کاشی"
        right={
          <button className="tdd-edit-btn" onClick={() => toast('صفحه ویرایش کاشی')}>
            <Edit size={13} />
            ویرایش
          </button>
        }
      />

      <div className="content tdd-content">

        {/* Hero */}
        <div className="tdd-hero">
          <div className="tdd-tile-bg" />
          <div className="tdd-hero-overlay" />
          <div className="tdd-hero-body">
            <span className="tdd-size-badge">۱۰۰×۳۰ cm</span>
            <h2 className="tdd-hero-name">کاشی سرامیک — پله ۸۳۴</h2>
            <div className="tdd-hero-sku">6029301028342120</div>
          </div>
        </div>

        {/* Stock stats */}
        <div className="tdd-stats">
          <div className="tdd-stat avail">
            <div className="tds-num">۱۲۶</div>
            <div className="tds-lbl">موجود</div>
          </div>
          <div className="tdd-stat frozen">
            <div className="tds-num">۱۴</div>
            <div className="tds-lbl">مسدود</div>
          </div>
          <div className="tdd-stat total">
            <div className="tds-num">۱۴۰</div>
            <div className="tds-lbl">کل فیزیکی</div>
          </div>
        </div>

        {/* Specs */}
        <div className="tdd-card">
          <div className="tdd-card-head"><h4>مشخصات فنی</h4></div>
          <div className="tdd-specs-grid">
            {SPECS.map(([k, v]) => (
              <div className="tdd-spec" key={k}>
                <span className="tds-k">{k}</span>
                <span className="tds-v">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock update */}
        <div className="tdd-card">
          <div className="tdd-card-head">
            <h4>بروزرسانی موجودی</h4>
            <span className="tdd-card-meta">فعلی: <b>۱۲۶</b></span>
          </div>
          <div className="tdd-card-body">
            <div className="tdd-stepper">
              <button className="tdd-step minus" onClick={() => quickAdd(-1)} aria-label="کاهش">
                <Minus size={18} strokeWidth={2.5} />
              </button>
              <input
                className="tdd-step-input"
                type="text"
                defaultValue="۱۲۶"
                onClick={(e) => e.currentTarget.select()}
              />
              <button className="tdd-step plus" onClick={() => quickAdd(1)} aria-label="افزایش">
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>
            <button className="tdd-submit" onClick={() => toast('✓ موجودی بروز شد')}>
              <Check size={14} strokeWidth={2.5} />
              ثبت تغییر
            </button>
          </div>
        </div>

        {/* Assigned reps */}
        <div className="tdd-card">
          <div className="tdd-card-head">
            <h4>نماینده‌های دارنده</h4>
            <span className="tdd-card-meta"><b>۳</b> نماینده</span>
          </div>
          <div className="tdd-reps">
            <div className="tdd-rep">
              <div className="tdd-rep-av">م</div>
              <div className="tdd-rep-info">
                <div className="tdd-rep-name">مارال رحیمی</div>
                <div className="tdd-rep-meta">قیمت: <b>۷۵۰,۰۰۰</b> ت · موجودی ۱۲</div>
              </div>
              <span className="tdd-rep-badge profit">+۲۱٪</span>
            </div>
            <div className="tdd-rep">
              <div className="tdd-rep-av">ا</div>
              <div className="tdd-rep-info">
                <div className="tdd-rep-name">احمد کریمی</div>
                <div className="tdd-rep-meta">قیمت: <b>۸۲۰,۰۰۰</b> ت · موجودی ۲۰</div>
              </div>
              <span className="tdd-rep-badge profit">+۳۲٪</span>
            </div>
            <div className="tdd-rep last">
              <div className="tdd-rep-av">ر</div>
              <div className="tdd-rep-info">
                <div className="tdd-rep-name">رضا کیانی</div>
                <div className="tdd-rep-meta">هنوز قیمت نزده · موجودی ۵</div>
              </div>
              <span className="tdd-rep-badge pending">—</span>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="tdd-card tdd-tx-card">
          <div className="tdd-card-head"><h4>تاریخچه تراکنش‌ها</h4></div>
          <div className="tdd-tx-list">
            {TXS.map((tx, i) => (
              <div className={`tdd-tx-item${i === TXS.length - 1 ? ' last' : ''}`} key={i}>
                <div className={`tdd-tx-ico ${tx.dir}`}>
                  {tx.dir === 'up' ? <ArrowUp strokeWidth={2.5} /> : <ArrowDown strokeWidth={2.5} />}
                </div>
                <div className="tdd-tx-info">
                  <div className="tdd-tx-type">{tx.type}</div>
                  <div className="tdd-tx-meta">{tx.meta}</div>
                </div>
                <div className={`tdd-tx-amt ${tx.dir}`}>{tx.amt}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
