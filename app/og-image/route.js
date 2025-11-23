import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #B8E6E6 100%)',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            מעגנה
          </h1>
          <h2
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '30px',
              lineHeight: '1.2',
            }}
          >
            בית משלנו על המים
          </h2>
          <p
            style={{
              fontSize: '32px',
              color: '#4a5568',
              marginTop: '20px',
              lineHeight: '1.5',
            }}
          >
            מקימים יחד כפר נופש קואופרטיבי בכנרת
          </p>
          <p
            style={{
              fontSize: '28px',
              color: '#718096',
              marginTop: '20px',
            }}
          >
            טבע, פשטות, קהילה
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

