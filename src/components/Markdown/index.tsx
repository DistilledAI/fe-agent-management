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

  return <Markdown>{breakLine(msg)}</Markdown>
}

export default MarkdownMessage
