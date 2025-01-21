import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [sendMessage, setSendMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState('')

  const sendEvent = () => {
    window.top?.postMessage(sendMessage, 'http://localhost:5174')
    setSendMessage('')
  }

  useEffect(() => {
    const messageHandler = (event: MessageEvent<string>) => {
      if (event.origin !== 'http://localhost:5174') return
      setReceivedMessage((m) => m + event.data + ' | ')
    }

    window.addEventListener('message', messageHandler)

    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [])

  return (
    <div>
      <h1>Inner App</h1>
      <label htmlFor='message'> Send message: </label>
      <input
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        type='text'
        id='message'
      />
      <button
        disabled={!sendMessage}
        onClick={sendEvent}
      >
        Send
      </button>
      <div
        style={{
          backgroundColor: '#ececec',
          height: 150,
          width: 400,
          marginTop: 12,
          marginBottom: 12,
          textAlign: 'left',
          paddingLeft: 12,
        }}
      >
        <p>
          Messages received from <strong>parent</strong>:
        </p>
        {receivedMessage}
      </div>
    </div>
  )
}

export default App
