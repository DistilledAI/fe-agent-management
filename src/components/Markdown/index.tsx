import { isImageUrl } from "@utils/index"
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

  const enhancedMessage = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, (url) => {
      if (isImageUrl(url)) {
        return `![image](${url})`
      }
      return url
    })
  }

  const renderers = {
    ol: ({ children }: any) => (
      <ol style={{ listStyleType: "decimal", paddingLeft: "16px" }}>
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li>{children}</li>,
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        className="h-auto max-w-[280px] rounded-3xl border border-mercury-100 object-cover shadow-1"
      />
    ),
  }

  return (
    <Markdown components={renderers}>
      {breakLine(enhancedMessage(msg))}
    </Markdown>
  )
}

export default MarkdownMessage
