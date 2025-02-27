import React from "react"
import Link from "next/link"
import { HiOutlineArrowCircleRight } from "react-icons/hi"
import { useMessageStore } from "stores/useMessageStore"

const DaoInboxCard = ({ safe, setInboxView }) => {
  const setChannelAddress = useMessageStore(set => set.setChannelAddress)
  const setThreadChannel = useMessageStore(set => set.setThreadChannel)
  const channelAddress = useMessageStore(state => state.channelAddress)

  const handleClick = () => {
    setChannelAddress(safe)
    setInboxView()
    setThreadChannel(null)
  }

  return (
    <li
      className={
        "mb-2 flex w-full flex-row rounded-lg bg-slate-200 p-3 dark:bg-slate-800" +
        (channelAddress === safe ? " text-blue-500" : "")
      }
      onClick={handleClick}
    >
      <div>
        <div className="h-10 w-10 rounded-full border border-white bg-slate-200 dark:bg-slate-900"></div>
      </div>
      <div className="ml-3 hidden w-11/12 flex-col justify-center pl-3 md:flex">
        <span className="text-sm font-bold">
          {safe?.length > 30 ? safe.substring(0, 10).concat("...") : safe}
        </span>
      </div>
      <div className="self-center">
        <HiOutlineArrowCircleRight size={24} />
      </div>
    </li>
  )
}

export default DaoInboxCard
