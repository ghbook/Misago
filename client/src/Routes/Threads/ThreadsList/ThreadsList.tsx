import { ApolloError } from "apollo-client"
import React from "react"
import { CardLoader } from "../../../UI"
import { IThread } from "../Threads.types"
import ThreadsListBlankslate from "./ThreadsListBlankslate"
import ThreadsListCard from "./ThreadsListCard"
import ThreadsListGraphQLError from "./ThreadsListGraphQLError"
import ThreadsListItem from "./ThreadsListItem/ThreadsListItem"
import ThreadsListUpdateButton from "./ThreadsListUpdateButton"

interface IThreadsListProps {
  category?: {
    id: string
    slug: string
  } | null
  loading?: boolean
  error?: ApolloError | null
  threads: {
    items: Array<IThread>
    nextCursor: string | null
  } | null
  update?: {
    threads: number
    loading: boolean
    fetch: () => void
  } | null
}

const ThreadsList: React.FC<IThreadsListProps> = ({
  category,
  error,
  loading,
  threads,
  update,
}) => {
  if (loading && !threads) {
    return (
      <ThreadsListCard>
        <CardLoader />
      </ThreadsListCard>
    )
  }

  if (!threads && error) {
    return (
      <ThreadsListCard>
        <ThreadsListGraphQLError error={error} />
      </ThreadsListCard>
    )
  }

  return (
    <ThreadsListCard>
      {update && update.threads > 0 && (
        <ThreadsListUpdateButton
          threads={update.threads}
          loading={update.loading}
          disabled={loading}
          onClick={update.fetch}
        />
      )}
      {threads && threads.items.length > 0 ? (
        <ul className="list-group list-group-flush">
          {threads.items.map((thread) => (
            <ThreadsListItem key={thread.id} thread={thread} />
          ))}
        </ul>
      ) : (
        <ThreadsListBlankslate category={category} />
      )}
      {loading && <CardLoader />}
    </ThreadsListCard>
  )
}

export default ThreadsList
