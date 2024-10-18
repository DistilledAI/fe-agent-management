import useAuthState from "@hooks/useAuthState"
import useOutsideClick from "@hooks/useOutSideClick"
import useReconnectWallet from "@hooks/useReconnectWallet"
import { ScrollShadow } from "@nextui-org/react"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import SearchResult from "../ChatBox/LeftBar/SearchContainer/Result"
import useSearch from "../ChatBox/LeftBar/SearchContainer/useSearch"
import useMessageSocket from "../ChatBox/useMessageSocket"
import ChatDetail from "./ChatDetail"
import ChatList from "./ChatList"
import ChatSearch from "./ChatSearch"

const ChatPageMobile = () => {
  const { chatId } = useParams()
  const { isLogin } = useAuthState()
  const [isSearch, setIsSearch] = useState(false)
  const inputRef = useRef<any>(null)
  const searchRef = useRef<any>(null)
  useOutsideClick(searchRef, () => setIsSearch(false))
  const { data, setQuery, query, debounceSearch } = useSearch(inputRef, false)

  useReconnectWallet()
  useMessageSocket()

  if (!isLogin) return null

  return chatId ? (
    <ChatDetail />
  ) : (
    <div className="min-h-[calc(100dvh-110px)] bg-mercury-30 font-barlow">
      <div
        ref={searchRef}
        className="fixed left-0 top-[50px] z-10 w-full bg-[rgba(255,255,255,0.85)] px-4 py-1 backdrop-blur-[10px]"
      >
        <ChatSearch
          inputRef={inputRef}
          debounceSearch={debounceSearch}
          query={query}
          setQuery={setQuery}
          setIsSearch={setIsSearch}
        />
        {isSearch && (
          <div className="absolute left-0 top-[100%] max-h-[calc(100dvh-300px)] w-full rounded-b-xl bg-white px-2 shadow-lg">
            <ScrollShadow className="max-h-[calc(100dvh-300px)]">
              <SearchResult data={data} />
            </ScrollShadow>
          </div>
        )}
      </div>
      <div className="h-[calc(100vh-110px)] w-full bg-[rgba(255,255,255,0.85)] pt-[56px]">
        <ChatList />
      </div>
    </div>
  )
}

export default ChatPageMobile
