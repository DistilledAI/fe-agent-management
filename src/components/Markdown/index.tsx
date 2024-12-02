import ViewFullMedia from "@components/ImagePreview"
import { useDisclosure } from "@nextui-org/react"
import { getActiveColorRandomById, isImageUrl } from "@utils/index"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"

const MarkdownMessage = ({ msg }: { msg: string }) => {
  const { chatId } = useParams()
  const { textColor } = getActiveColorRandomById(chatId)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const replaceSrcImage = (src: string) => {
    if (src.includes("https://defi-lens.s3.us-east-2.amazonaws.com/")) {
      const imageSrc = src.replace(
        /https:\/\/defi-lens\.s3\.us-east-2\.amazonaws\.com\/media\/(.*\.jpeg)/,
        "https://static.distilled.ai/media/$1",
      )
      return imageSrc
    }

    return src
  }

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
    img: ({ src, alt }: any) => {
      const imageSrc = replaceSrcImage(src)

      return (
        <>
          <img
            src={imageSrc}
            alt={alt}
            className="h-auto min-h-[200px] max-w-[280px] cursor-pointer rounded-3xl border border-mercury-100 object-cover shadow-1"
            onClick={() => onOpen()}
          />

          <ViewFullMedia isOpen={isOpen} url={imageSrc} onClose={onClose} />
        </>
      )
    },
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={textColor}
      >
        {children}
      </a>
    ),
  }

  return (
    <Markdown components={renderers}>
      {breakLine(enhancedMessage(msg))}
    </Markdown>
  )
}

export default MarkdownMessage
