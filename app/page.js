export default function Home() {
  return (
      <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: 'var(--spacing-lg)'
      }}>
          <div style={{ textAlign: 'center' }}>
              <h1 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>
                  MujerTech
              </h1>
              <p style={{ color: 'var(--gray)' }}>
                  Taller Introductorio de IA — Migration in progress
              </p>
          </div>
      </div>
  );
}