import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import { FC } from 'react'

type CodeHighlightProps = {
  children: React.ReactNode
}

export const CodeHighlight: FC<CodeHighlightProps> = ({ children, className }) => {
  const language = className?.replace('language-', '').trim()

  if (!language) {
    return <code>{children}</code>
  }

  // const showLineNumbers = !['shell', 'text'].includes(language)

  return (
    <Highlight {...defaultProps} theme={darkTheme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
