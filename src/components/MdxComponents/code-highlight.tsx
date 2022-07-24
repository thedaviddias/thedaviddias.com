import Highlight, { defaultProps } from 'prism-react-renderer'
// import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import { FC } from 'react'

type CodeHighlightProps = {
  children: React.ReactNode
}

export const CodeHighlight: FC<CodeHighlightProps> = ({ children, className }) => {
  const language = className?.replace('language-', '').trim()

  return (
    <Highlight {...defaultProps} theme={lightTheme} code={children} language={language}>
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
