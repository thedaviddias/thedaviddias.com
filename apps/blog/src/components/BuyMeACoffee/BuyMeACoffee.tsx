import Image from 'next/image'
import React from 'react'

export const BuyMeACoffee = () => {
  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-600 pt-8 text-center">
      <div className="text-2xl">Has this been helpful to you?</div>
      <p className="text-lg">
        You can support my work by sharing this article with others,
        <br />
        or perhaps buy me a cup of coffee 😊
        <div>
          <a
            href="https://ko-fi.com/thedaviddias"
            rel="noopener noreferrer"
            target="_blank"
            className="external-link plausible-event-name=kofi"
          >
            <Image
              className="inline-block h-auto max-w-xl pt-2"
              src="/images/kofi.png"
              width={40}
              height={40}
              alt="Buy me a coffee on Ko-fi"
              aria-hidden="true"
              priority={true}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </a>
        </div>
      </p>
    </div>
  )
}
