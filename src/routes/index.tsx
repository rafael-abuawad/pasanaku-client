import { createFileRoute } from '@tanstack/react-router'
import { ConnectKitButton } from 'connectkit'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ConnectKitButton />
    </div>
  )
}