import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export async function GET(request) {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            width: '70%',
            maxWidth: '640px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="420"
            height="240"
            viewBox="0 0 280 160"
            style={{
              filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.1))',
            }}
          >
            {/* Houses sketch */}
            <g stroke="#1a202c" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Left house */}
              <path d="M60 104 L60 68 L96 46 L132 68 L132 104 Z" />
              <path d="M88 104 L88 83 L100 83 L100 104" />
              
              {/* Right house */}
              <path d="M154 106 L154 74 L186 54 L218 74 L218 106 Z" />
              <path d="M188 106 L188 88 Q188 80 196 80 Q204 80 204 88 L204 106" />
              
              {/* Water waves */}
              <path d="M36 116 C50 110 70 108 90 110 C110 112 130 110 150 112 C170 114 190 112 210 114 C230 116 250 114 264 118" />
              <path d="M52 132 C70 126 90 124 110 126 C130 128 150 126 170 128 C190 130 210 128 230 130 C240 131 250 129 260 133" />
              <path d="M98 144 C115 138 135 136 155 138 C175 140 195 138 215 142" />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
  
  // Add cache headers to prevent caching
  const headers = new Headers(imageResponse.headers)
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  headers.set('Pragma', 'no-cache')
  headers.set('Expires', '0')
  
  return new Response(imageResponse.body, {
    status: imageResponse.status,
    statusText: imageResponse.statusText,
    headers: headers,
  })
}

