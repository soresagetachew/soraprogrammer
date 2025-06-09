import React, { useEffect, useState } from 'react';

// Utility for responsive font and spacing
const rem = (px) => `${px / 16}rem`;

// Map skip sizes to your provided images
const skipImages = {
  4: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
  5: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
  20: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg",
};

function getSkipImage(skip) {
  const name = typeof skip?.name === 'string' ? skip.name : '';
  const size = name.match(/\d+/)?.[0];
  if (size && skipImages[size]) return skipImages[size];
  return skipImages[4];
}

function SkipOptions() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setSkips(
          (Array.isArray(data) ? data : []).map((skip) => {
            const name = typeof skip?.name === 'string' ? skip.name : '';
            return {
              ...skip,
              image: getSkipImage(skip),
              size: name.match(/\d+/)?.[0] || 'N/A',
              roadAllowed: !name.includes('10') && !name.includes('12'),
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSelect = (id) => setSelectedSkipId(id);

  const handleProceed = () => {
    alert(`You selected skip ID: ${selectedSkipId}`);
  };

  // Responsive styles
  const styles = {
    root: {
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #fdf6e3 0%, #f5e6ff 100%)',
      padding: rem(8),
      fontFamily: 'system-ui, sans-serif',
      transition: 'background 0.3s',
      animation: 'bgAnim 8s ease-in-out infinite alternate',
    },
    container: {
      maxWidth: rem(1100),
      margin: '0 auto',
      background: 'rgba(255,255,255,0.92)',
      borderRadius: rem(18),
      boxShadow: '0 4px 32px rgba(120,72,188,0.13)',
      padding: rem(20),
      marginTop: rem(18),
      marginBottom: rem(18),
      backdropFilter: 'blur(2px)',
    },
    header: {
      textAlign: 'center',
      color: '#7c3aed',
      fontSize: rem(28),
      fontWeight: 800,
      marginBottom: rem(4),
      letterSpacing: 0.5,
      background: 'linear-gradient(90deg,#f59e42,#7c3aed,#f472b6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subheader: {
      textAlign: 'center',
      color: '#a78bfa',
      marginBottom: rem(24),
      fontSize: rem(16),
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: rem(16),
      marginBottom: rem(24),
    },
    card: (selected) => ({
      background: selected
        ? 'linear-gradient(120deg, #fdf6e3 0%, #f5e6ff 100%)'
        : 'linear-gradient(120deg, #fff7ed 0%, #f3e8ff 100%)',
      borderRadius: rem(14),
      boxShadow: selected
        ? '0 0 0 3px #f59e42'
        : '0 2px 12px rgba(120,72,188,0.08)',
      border: selected ? '2px solid #f59e42' : '2px solid #f3e8ff',
      display: 'flex',
      flexDirection: 'column',
      minHeight: rem(320),
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s, border 0.2s, background 0.2s',
    }),
    imageWrap: {
      width: '100%',
      height: rem(120),
      background: '#f3e8ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block',
      margin: 0,
      borderRadius: rem(8),
      background: '#f3f4f6',
      boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
    },
    badge: {
      position: 'absolute',
      top: rem(8),
      right: rem(8),
      background: 'linear-gradient(90deg,#f59e42,#f472b6)',
      color: '#fff',
      borderRadius: rem(8),
      padding: '2px 10px',
      fontWeight: 700,
      fontSize: rem(13),
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      zIndex: 2,
      border: '2px solid #fff',
    },
    warning: {
      position: 'absolute',
      left: rem(8),
      bottom: rem(8),
      background: '#fffbe6',
      color: '#b7791f',
      borderRadius: rem(6),
      padding: '3px 8px',
      fontWeight: 600,
      fontSize: rem(12),
      display: 'flex',
      alignItems: 'center',
      gap: rem(5),
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      zIndex: 2,
    },
    cardBody: {
      padding: rem(14),
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    skipName: {
      color: '#7c3aed',
      margin: 0,
      fontSize: rem(17),
      fontWeight: 700,
      marginBottom: rem(4),
      letterSpacing: 0.2,
    },
    skipDesc: {
      color: '#a78bfa',
      fontSize: rem(13),
      marginBottom: rem(10),
      minHeight: rem(20),
    },
    skipPrice: {
      color: '#f59e42',
      fontWeight: 700,
      fontSize: rem(18),
      marginBottom: rem(10),
    },
    selectBtn: (selected) => ({
      marginTop: 'auto',
      width: '100%',
      padding: rem(10),
      fontSize: rem(15),
      fontWeight: 700,
      background: selected
        ? 'linear-gradient(90deg,#f59e42,#f472b6)'
        : 'linear-gradient(90deg,#f3e8ff,#fff7ed)',
      color: selected ? '#fff' : '#a16207',
      border: selected ? '2px solid #f59e42' : '2px solid #f3e8ff',
      borderRadius: rem(8),
      cursor: 'pointer',
      transition: 'background 0.2s, color 0.2s, border 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: rem(7),
      boxShadow: selected ? '0 2px 8px rgba(245,158,66,0.18)' : 'none',
      outline: selected ? '2px solid #f59e42' : 'none',
    }),
    proceedBtn: (enabled) => ({
      width: '100%',
      maxWidth: rem(320),
      padding: rem(14),
      fontSize: rem(17),
      fontWeight: 800,
      background: enabled
        ? 'linear-gradient(90deg,#f59e42 0%,#f472b6 100%)'
        : '#f3e8ff',
      color: enabled ? '#fff' : '#b0b3b8',
      border: 'none',
      borderRadius: rem(10),
      cursor: enabled ? 'pointer' : 'not-allowed',
      margin: `${rem(24)} auto 0 auto`,
      display: 'block',
      transition: 'background 0.2s, color 0.2s',
      boxShadow: enabled ? '0 2px 8px rgba(245,158,66,0.10)' : 'none',
      letterSpacing: 0.5,
    }),
    // Media queries for mobile/tablet
    '@media (max-width: 900px)': {
      grid: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
    '@media (max-width: 600px)': {
      container: {
        padding: rem(8),
      },
      grid: {
        gridTemplateColumns: '1fr',
        gap: rem(8),
      },
      card: {
        minHeight: rem(220),
      },
      cardBody: {
        padding: rem(8),
      },
      proceedBtn: {
        width: '100%',
      },
    },
    '@global': `
      @keyframes bgAnim {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `,
  };

  // Responsive helper for grid columns
  const getGridStyle = () => {
    if (window.innerWidth <= 600) {
      return { ...styles.grid, ...styles['@media (max-width: 600px)'].grid };
    }
    if (window.innerWidth <= 900) {
      return { ...styles.grid, ...styles['@media (max-width: 900px)'].grid };
    }
    return styles.grid;
  };

  // Responsive helper for container
  const getContainerStyle = () => {
    if (window.innerWidth <= 600) {
      return { ...styles.container, ...styles['@media (max-width: 600px)'].container };
    }
    return styles.container;
  };

  // Inject keyframes for animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = styles['@global'];
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.root}>
      <div style={getContainerStyle()}>
        <h2 style={styles.header}>Choose Your Skip Size</h2>
        <p style={styles.subheader}>Select the skip size that best suits your needs</p>
        {loading ? (
          <p style={{ color: '#f59e42', textAlign: 'center', fontSize: rem(18), fontWeight: 600 }}>
            Loading skip options...
          </p>
        ) : error ? (
          <p style={{ color: '#f472b6', textAlign: 'center', fontSize: rem(16), fontWeight: 600 }}>
            Error loading skip options: {error}
          </p>
        ) : (
          <div style={getGridStyle()}>
            {skips.map((skip) => {
              const selected = selectedSkipId === skip.id;
              return (
                <div
                  key={skip.id}
                  style={
                    window.innerWidth <= 600
                      ? { ...styles.card(selected), ...styles['@media (max-width: 600px)'].card }
                      : styles.card(selected)
                  }
                  tabIndex={0}
                  aria-pressed={selected}
                  onClick={() => handleSelect(skip.id)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelect(skip.id)}
                >
                  <div style={styles.imageWrap}>
                    <img
                      src={skip.image}
                      alt={skip.name}
                      style={styles.img}
                    />
                    <span style={styles.badge}>{skip.size} Yards</span>
                    {!skip.roadAllowed && (
                      <span style={styles.warning}>
                        <span style={{ fontSize: rem(15) }}>⚠️</span> Not Allowed On The Road
                      </span>
                    )}
                  </div>
                  <div
                    style={
                      window.innerWidth <= 600
                        ? { ...styles.cardBody, ...styles['@media (max-width: 600px)'].cardBody }
                        : styles.cardBody
                    }
                  >
                    <h3 style={styles.skipName}>{skip.name}</h3>
                    <div style={styles.skipDesc}>{skip.description || '14 day hire period'}</div>
                    <div style={styles.skipPrice}>£{skip.price}</div>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); handleSelect(skip.id); }}
                      style={styles.selectBtn(selected)}
                      aria-label={selected ? 'Selected' : 'Select this skip'}
                    >
                      {selected ? 'Selected' : 'Select This Skip'}
                      <span style={{ fontSize: rem(16) }}>&rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button
          onClick={handleProceed}
          disabled={selectedSkipId === null}
          style={
            window.innerWidth <= 600
              ? { ...styles.proceedBtn(selectedSkipId !== null), ...styles['@media (max-width: 600px)'].proceedBtn }
              : styles.proceedBtn(selectedSkipId !== null)
          }
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default SkipOptions;
