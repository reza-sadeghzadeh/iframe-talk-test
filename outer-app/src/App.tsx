import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [sendMessage, setSendMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState('')
  const iFrameRef = useRef<HTMLIFrameElement>(null)

  const sendEvent = () => {
    iFrameRef.current?.contentWindow?.postMessage(sendMessage, '*')
    setSendMessage('')
  }

  useEffect(() => {
    const messageHandler = (event) => {
      if (event.origin !== 'http://localhost:5173') return
      setReceivedMessage((m) => m + event.data + ' | ')
    }

    window.addEventListener('message', messageHandler)

    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [])

  return (
    <div
      style={{
        border: '4px solid red',
      }}
    >
      <h1>Outer App</h1>
      <div>
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
      </div>
      <div
        style={{
          backgroundColor: '#ececec',
          height: 160,
          width: 800,
          marginTop: 12,
          marginBottom: 12,
          textAlign: 'left',
          paddingLeft: 12,
        }}
      >
        <p>
          Messages received from <strong>iframe</strong>:
        </p>
        {receivedMessage}
      </div>

      <iframe
        ref={iFrameRef}
        src='http://localhost:5173'
        style={{
          border: '10px solid red',
          width: 500,
          height: 500,
        }}
      ></iframe>
    </div>
  )
}

export default App
