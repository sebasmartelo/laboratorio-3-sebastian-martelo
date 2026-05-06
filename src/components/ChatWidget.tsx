import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: '¡Hola! Soy tu asistente de IA. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://sebastianmartelo53.app.n8n.cloud/webhook/2ff71519-19f6-45c8-b3d7-83dafe2ad077', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newUserMsg.text,
          text: newUserMsg.text,
          chatInput: newUserMsg.text
        }),
      });

      let aiText = 'No pude procesar la respuesta.';
      if (response.ok) {
        const textResponse = await response.text();
        try {
          const json = JSON.parse(textResponse);
          // Intentar encontrar el texto en diferentes campos comunes de respuestas de N8N
          aiText = json.output || json.response || json.text || json.message || textResponse;
          
          if (Array.isArray(json) && json.length > 0) {
              aiText = json[0].output || json[0].text || json[0].message || JSON.stringify(json[0]);
          }
        } catch (e) {
          aiText = textResponse; // Si no es JSON, usar el texto plano
        }
      } else {
        aiText = `Error del servidor: ${response.status}`;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: 'Ocurrió un error al intentar conectarse al asistente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button 
        className={`chat-fab ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </button>

      {/* Ventana de chat */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div style={{ 
          padding: '16px 20px', 
          background: 'linear-gradient(135deg, var(--accent-dark-green), #0f766e)', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.01em' }}>Asistente AI</div>
              <div style={{ fontSize: '0.75rem', color: '#A7F3D0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
                En línea
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', display: 'flex', padding: '4px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'white'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Zona de mensajes */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          backgroundColor: '#F9FAFB'
        }}>
          {messages.map(msg => (
            <div 
              key={msg.id} 
              style={{
                display: 'flex',
                gap: '8px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                maxWidth: '85%'
              }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--accent-green)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-soft)'
              }}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '16px',
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                backgroundColor: msg.sender === 'user' ? 'var(--accent-blue)' : 'white',
                color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                wordBreak: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-soft)' }}>
                <Bot size={14} />
              </div>
              <div style={{ padding: '14px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Zona de input */}
        <div style={{ 
          padding: '16px', 
          borderTop: '1px solid #E5E7EB',
          backgroundColor: 'white'
        }}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: '24px', padding: '6px 6px 6px 16px', border: '1px solid transparent', transition: 'border-color 0.2s', ...(inputValue ? { borderColor: 'var(--accent-blue)' } : {}) }}
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'inherit' }}
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{
                width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                backgroundColor: inputValue.trim() && !isLoading ? 'var(--accent-blue)' : '#D1D5DB',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: inputValue.trim() && !isLoading ? '0 2px 8px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <Send size={16} style={{ marginLeft: '2px' }} />
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Conectado a n8n vía Webhook
          </div>
        </div>
      </div>
    </>
  );
};
