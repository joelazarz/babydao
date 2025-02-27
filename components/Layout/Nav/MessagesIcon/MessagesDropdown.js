import React from "react"
import Link from "next/link"
import MessageCard from "./MessageCard"
import { useUiStore } from "stores/useUiStore"
import { HiOutlineArrowCircleRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"

const MessagesDropdown = ({ ...props }) => {
  const { messagesOpen, address, threads, clickAway } = props

  const setCreateThreadModalOpen = useUiStore(
    state => state.setCreateThreadModalOpen
  )

  const handleStartConversation = () => {
    setCreateThreadModalOpen()
    clickAway()
  }

  return (
    <div
      className={
        (messagesOpen ? "absolute " : "hidden ") +
        "top-0 right-0 z-50 h-2/3 w-4/12 -translate-x-20 translate-y-20 overflow-auto rounded border bg-slate-200 px-4 py-2 text-slate-800 shadow dark:bg-slate-900 dark:text-white"
      }
    >
      <div className="mb-2 flex flex-row items-center justify-between rounded border p-2">
        <h1>Messages</h1>
        <div className="flex flex-row">
          <Link href={"/messages"}>
            <a onClick={clickAway}>
              <button className="nav-btn mx-1">
                <HiOutlineArrowCircleRight />
              </button>
            </a>
          </Link>
          <button className="nav-btn mx-1" onClick={handleStartConversation}>
            <HiOutlineChat />
          </button>
        </div>
      </div>
      <ul className="">
        {threads.map((thread, i) => {
          return (
            <MessageCard
              key={i}
              title={thread[0]}
              thread={thread[1]}
              clickAway={clickAway}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default MessagesDropdown
