'use client';

import { useState } from 'react';

/**
 * Break-Even ROAS Calculator — ported from the original calcBE() in main.js
 * and the .ks-engine markup in 03-phase3-build-the-store.html (id="be-calc-widget").
 * Same field labels, same classes (ks-field, ks-engine), same formula and
 * copy in the result detail line — only the wiring is React state instead
 * of inline oninput handlers + getElementById.
 */
export default function ROASCalculator() {
  const [price, setPrice] = useState('');
  const [cogs, setCogs] = useState('');
  const [ship, setShip] = useState('');
  const [fees, setFees] = useState('');

  const priceNum = parseFloat(price) || 0;
  const cogsNum = parseFloat(cogs) || 0;
  const shipNum = parseFloat(ship) || 0;
  const feesNum = parseFloat(fees) || 0;

  const showResult = !!(priceNum && cogsNum);
  const totalCost = cogsNum + shipNum + feesNum;
  const grossProfit = priceNum - totalCost;

  let roasText = '';
  let detailText = '';
  if (showResult) {
    if (grossProfit <= 0) {
      roasText = 'No margin';
      detailText = `Your total costs ($${totalCost.toFixed(2)}) exceed or equal the selling price ($${priceNum.toFixed(
        2
      )}). Reprice or reduce COGS.`;
    } else {
      const be = (priceNum / grossProfit).toFixed(2);
      roasText = `${be}×`;
      detailText = `Gross profit/order: $${grossProfit.toFixed(2)} | Break-even: earn $${priceNum.toFixed(
        0
      )} per $${grossProfit.toFixed(0)} spent on ads. Below this ROAS = you are paying Meta to lose money.`;
    }
  }

  return (
    <div className="ks-engine" id="be-calc-widget" style={{ margin: '0 0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div className="ks-field">
          <label>Selling Price ($)</label>
          <input
            id="be-price"
            type="number"
            placeholder="e.g. 49"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="ks-field">
          <label>Product + Shipping Cost ($)</label>
          <input
            id="be-cogs"
            type="number"
            placeholder="e.g. 18"
            value={cogs}
            onChange={(e) => setCogs(e.target.value)}
          />
        </div>
        <div className="ks-field">
          <label>Shipping You Charge ($)</label>
          <input
            id="be-ship"
            type="number"
            placeholder="e.g. 0 if free"
            value={ship}
            onChange={(e) => setShip(e.target.value)}
          />
        </div>
        <div className="ks-field">
          <label>Shopify / Payment Fees (%)</label>
          <input
            id="be-fees"
            type="number"
            min={0}
            max={15}
            step={0.1}
            placeholder="e.g. 2.9"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
          <small style={{ color: 'var(--text3)', fontSize: 11, display: 'block', marginTop: 3 }}>
            Enter as percentage e.g. 2.9
          </small>
        </div>
        <p style={{ fontSize: '12.5px', color: 'var(--text3)', margin: '10px 0 4px', fontStyle: 'italic' }}>
          💡 Input your numbers above to see your break-even ROAS automatically.
        </p>
      </div>
      <div
        id="be-result"
        style={{
          display: showResult ? 'block' : 'none',
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-md)',
          padding: '20px 22px',
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent2)',
            marginBottom: 10,
          }}
        >
          Your Break-Even ROAS
        </div>
        <div
          id="be-roas"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 800,
            color: 'var(--heading)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          {roasText}
        </div>
        <div id="be-detail" style={{ fontSize: '13.5px', color: 'var(--text2)', lineHeight: 1.6 }}>
          {detailText}
        </div>
      </div>
    </div>
  );
}
