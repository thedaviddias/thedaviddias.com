/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const hasDescription = searchParams.has('description')
    const hasAuthor = searchParams.has('author')

    // 3: If so, take the passed value. If not, assign a default
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Some title'

    const backgroundImage = 'images/og/background-01.jpg'

    const author = hasAuthor ? searchParams.get('author') : 'David Dias'

    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 200)
      : 'Some description'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundImage: `url(http://localhost:3000/${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          tw="bg-slate-300 h-screen w-screen flex items-center justify-center flex-col flex-nowrap"
        >
          <div tw="bg-white flex mx-10 rounded-xl">
            <div tw="flex flex-col w-full py-12 px-4 p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-title font-bold text-gray-900 text-left">
                <span>{title}</span>
              </h2>
              <span tw="text-xl">{description}...</span>
              <div tw="mt-8 flex items-center">
                <img
                  src="http://localhost:3000/images/david-dias-round.png"
                  width="50"
                  height="50"
                  className="rounded-full h-8 w-8"
                  alt=""
                />
                <span className="p-2">{author}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
