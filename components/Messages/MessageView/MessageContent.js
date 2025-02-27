import React from "react"
import MessageViewCard from "./MessageViewCard"
import { useMessageStore } from "stores/useMessageStore"
import * as api from "query"
import { useQuery } from "react-query"

const MessageContent = () => {
  const { threadChannel } = useMessageStore()

  const { data: messages } = useQuery(
    ["thread messages", threadChannel],
    () => api.getThreadMessages({ channel: threadChannel }),
    {
      enabled: !!threadChannel,
      // retry: false,
      // retryOnMount: false,
      // refetchOnWindowFocus: false,
      // staleTime: Infinity,
    }
  )

  if (!messages?.length) {
    return (
      <div className="h-[70%] md:h-[85%] md:p-3">
        <div className="h-full overflow-scroll rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          No Messages
        </div>
      </div>
    )
  }

  return (
    <div className="h-[70%] md:h-[85%] md:p-3">
      <div className="h-full overflow-scroll rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
        {messages?.map(message => (
          <MessageViewCard key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default MessageContent
