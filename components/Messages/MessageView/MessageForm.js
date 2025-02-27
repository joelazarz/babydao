import React from "react"
import * as api from "query"
import { useQueryClient, useMutation } from "react-query"
import { useMessageStore } from "stores/useMessageStore"
import { useAccount } from "wagmi"
import useForm from "hooks/useForm"

const MessageForm = () => {
  const { state, setState, handleChange } = useForm()

  const queryClient = useQueryClient()

  const { threadChannel } = useMessageStore()

  const {
    data,
    error,
    mutateAsync: createMessage,
  } = useMutation(api.createMessage, {
    onSettled: async () => {
      await queryClient.invalidateQueries(["thread messages", threadChannel], {
        refetchActive: true,
      })
    },
  })

  const [{ data: accountData, error: accountError, loading: accountLoading }] =
    useAccount()

  const handleSubmit = e => {
    e.preventDefault()
    if (!accountData) {
      console.log("MessageForm.js no account data")
      return
    }
    const req = {
      sender: accountData.address,
      channel: threadChannel,
      body: state.message,
    }
    createMessage(req)
    setState({})
  }

  return (
    <form
      className="flex h-[15%] w-full flex-row items-center p-3 md:h-[10%]"
      onSubmit={handleSubmit}
    >
      <textarea
        autoFocus
        className="h-full w-[90%] resize-none rounded-xl bg-slate-100 p-3 text-white focus:text-slate-900 focus:outline-none dark:bg-slate-800 dark:focus:text-slate-100"
        type="textarea"
        name="message"
        placeholder="Message..."
        autoComplete="off"
        value={state.message || ""}
        onChange={handleChange}
        required
      />
      <button
        className="ml-3 flex items-center rounded-xl border bg-slate-200 px-4 py-3 font-bold shadow-xl focus:outline-none dark:bg-slate-800"
        type="submit"
      >
        send
      </button>
    </form>
  )
}

export default MessageForm
