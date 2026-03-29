import { useState } from 'react'

const conversations = ['GreenAI', 'HealthVision', 'FinSecure']

const initialMessages = [
  { from: 'investor', text: "Hello, I'm interested in your startup." },
  { from: 'founder', text: 'Thank you! Happy to discuss.' },
]

function Messages() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    const trimmedMessage = inputValue.trim()

    if (!trimmedMessage) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { from: 'investor', text: trimmedMessage },
    ])
    setInputValue('')
  }

  return (
    <main className="page">
      <header className="page__header">
        <span className="eyebrow">Investor Inbox</span>
        <h1>Messages</h1>
      </header>

      <div className="chat-layout">
        <aside className="chat-sidebar panel">
          <h2>Conversations</h2>
          <div className="conversation-list">
          {conversations.map((conversation) => (
            <button
              className="conversation-item"
              key={conversation}
              type="button"
            >
              {conversation}
            </button>
          ))}
          </div>
        </aside>

        <section className="chat-main panel chat-panel">
          <h2>Chat</h2>
          <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className={`message-row message-row--${message.from}`}
            >
              <div className={`message-bubble message-bubble--${message.from}`}>
                {message.text}
              </div>
            </div>
          ))}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Write a message..."
            />
            <button className="button-primary" type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Messages
