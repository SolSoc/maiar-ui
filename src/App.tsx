import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import { useEffect, useState } from 'react'


function generateUserId() {
  return Math.random().toString(36).substring(2, 15)
}

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [userId, setUserId] = useState<string>(localStorage.getItem('userId') || generateUserId())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([])


  const handleSubmit = async (e: React.FormEvent<HTMLTextAreaElement | HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const message = input
    const newMessages = [...messages, { id: messages.length, role: 'user', content: message }] as Message[]
    setInput('')
    setMessages(newMessages)
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userId,
        message: input
      })
    })
    const data = await response.json()
    setMessages([...newMessages, { id: messages.length, role: 'assistant', content: data }])
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId');
    if (!currentUserId) {
      localStorage.setItem('userId', userId);
    }
  }, [userId])

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 flex gap-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[180px] flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-[60px] w-[60px]"
            disabled={isLoading}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default App
