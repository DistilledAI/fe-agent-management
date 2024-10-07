import Markdown from "react-markdown"

const MarkdownMessage = ({ msg }: { msg: string }) => {
  const breakLine = (text: string) => {
    let md = text
    // Support multiple linebreaks
    md = text.replace(/```[\s\S]*?```/g, (m) => m.replace(/\n/g, "\n "))
    md = md.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ")
    // Support single linebreak
    md = md.replace(/(\n)/gm, "  \n")

    return md
  }

  const renderers = {
    ol: ({ children }: any) => (
      <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li>{children}</li>,
  }

  return <Markdown components={renderers}>{breakLine(msg)}</Markdown>
}

export default MarkdownMessage
