'use client';

import { useState } from 'react';

/**
 * ToolLogo — renders a tool's logo from the toolkit image set
 * (/images/<tool>.png), falling back to a clean lettered tile if the image
 * is missing (same graceful-degradation approach the toolkit cards use).
 */
export default function ToolLogo({ src, name }: { src?: string; name: string }) {
  const [err, setErr] = useState(false);
  const showImg = src && !err;
  return (
    <div className="itkc-logo" aria-hidden="true">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
        />
      ) : (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            fontWeight: 800,
            color: 'var(--accent2)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}
