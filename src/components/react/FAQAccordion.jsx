/**
 * FAQAccordion.jsx — accessible expand/collapse FAQ accordion.
 * Hydration: client:visible — defer until scrolled into view.
 *
 * CSS: uses .faq-item, .faq-trigger, .faq-chevron, .faq-answer from global.css.
 * Open state: adds .faq-item--open class; CSS rotates .faq-chevron via that.
 */

import { useState } from 'react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) { setOpenIndex((prev) => (prev === i ? null : i)); }

  if (items.length === 0) return null;

  return (
    <div className="faq-accordion">
      {items.map((item, i) => {
        const isOpen  = openIndex === i;
        const btnId   = `faq-btn-${i}`;
        const panelId = `faq-panel-${i}`;

        return (
          <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
            <h3 className="faq-question">
              <button
                id={btnId}
                className="faq-trigger"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="faq-answer" hidden={!isOpen}>
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
