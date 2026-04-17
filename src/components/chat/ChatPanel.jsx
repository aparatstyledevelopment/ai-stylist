import { useState, useRef, useEffect } from 'react';
import CitationTag from '../artifact/CitationTag.jsx';
import Button from '../common/Button.jsx';
import { sendChatMessage } from '../../api/chat.js';
import './ChatPanel.css';

function renderMessageContent(content, citations) {
  if (!citations?.length) return content;
  const parts = content.split(/(\[\[CIT:[^\]]+\]\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[\[CIT:([^\]]+)\]\]/);
    if (match) {
      const [source, entityId, period, field] = match[1].split(':');
      const cit = { source, entityId, period, field, displayLabel: `${source}, ${period}` };
      return <CitationTag key={i} citation={cit} />;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask me anything about your investors, holdings, or IR strategy. Every answer I give is grounded in your Monitor data.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading('Thinking…');

    const apiMessages = [...messages.filter(m => m.role !== 'system'), userMsg];

    let assistantText = '';
    const newCitations = [];

    try {
      const stream = sendChatMessage(apiMessages);
      setLoading('');

      for await (const { event, data } of stream) {
        if (event === 'chunk') {
          assistantText += data.text;
          setMessages(prev => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === 'assistant' && last?.streaming) {
              next[next.length - 1] = { ...last, content: assistantText };
            } else {
              next.push({ role: 'assistant', content: assistantText, streaming: true });
            }
            return next;
          });
        } else if (event === 'citation') {
          newCitations.push(data);
        } else if (event === 'done') {
          setMessages(prev => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === 'assistant') {
              next[next.length - 1] = { ...last, streaming: false, citations: newCitations };
            }
            return next;
          });
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <span className="chat-panel-title">AI Chat</span>
        <span className="chat-panel-subtitle muted">Grounded in Monitor data</span>
        <button className="chat-panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
            <div className="chat-msg-role">{msg.role === 'user' ? 'You' : 'Monitor IQ'}</div>
            <div className="chat-msg-content">
              {renderMessageContent(msg.content, msg.citations)}
              {msg.streaming && <span className="chat-cursor" />}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg chat-msg-assistant">
            <div className="chat-msg-role">Monitor IQ</div>
            <div className="chat-thinking">{loading}</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder="Ask about investors, holdings, meetings…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <Button variant="primary" size="sm" onClick={handleSend} disabled={!input.trim() || !!loading}>
          Send
        </Button>
      </div>
    </div>
  );
}
