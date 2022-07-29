import { useEffect, useState } from 'react'

export type SkipLinksProps = {
  title: string | undefined
  id: string
}

export default function useSkipLinks() {
  const [skipLinks, setSkipLinks] = useState<SkipLinksProps[]>([])

  useEffect(() => {
    const skipLinkElements = document.querySelectorAll(
      '[data-skip-link]:not(pre):not(code)'
    ) as NodeListOf<HTMLElement> | null

    const links =
      skipLinkElements &&
      Array.from(skipLinkElements, (skipLink) => ({
        title: skipLink.dataset.skipLink,
        id: skipLink.id,
      }))

    links && setSkipLinks(links)
  }, [])

  return { skipLinks }
}
