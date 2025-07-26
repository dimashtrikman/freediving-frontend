import React, { useState, useEffect, useCallback } from 'react';
import AuthStore from '../stores/AuthStore';

const API_URL = process.env.REACT_APP_SERVER_API_URL || 'http://localhost:8080';

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the logged-in user's email or username
  const isAdmin = (AuthStore.user?.roles || []).includes('ADMIN') || (AuthStore.user?.roles || []).includes('ROLE_ADMIN');
  const [customAuthor, setCustomAuthor] = useState('');
  const author = isAdmin ? (customAuthor || AuthStore.user?.email || AuthStore.user?.username || '') : (AuthStore.user?.email || AuthStore.user?.username || '');

  function renderMessages(messages) {
    return messages
      .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
      .map((msg, idx) => {
        const date = new Date(msg.dateCreated);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        const content = msg.content || "(empty)";

      return (
        <div key={msg.id || idx} style={{ marginBottom: 12, textAlign: 'left' }}>
          <div style={{ fontSize: '0.85em', fontStyle: 'italic', color: '#555' }}>
            {formattedDate} {formattedTime}
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1em' }}>
            {content}
          </div>
        </div>
      );
    });
  }

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch all posts for this user (or all, if you update backend)
      const res = await fetch(`${API_URL}/forum/posts/author`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data: []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (author) fetchMessages();
  }, [fetchMessages, author]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !author) return;
    setError('');
    try {
      // Use new endpoint: POST /forum/post/{author}
      const res = await fetch(`${API_URL}/forum/post/${author}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: input }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setInput('');
      fetchMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!author) {
    return <div>Loading user info...</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Forum Chat</h2>
      {isAdmin && (
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="author-input"><b>Post as:</b></label>
          <input
            id="author-input"
            type="text"
            value={customAuthor}
            onChange={e => setCustomAuthor(e.target.value)}
            placeholder="Enter author username/email"
            style={{ marginLeft: 8, padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
      )}
      <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', background: '#f9f9f9', padding: 10, marginBottom: 10 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          messages.length > 0 ? (
            renderMessages(messages)
          ) : (
            <div>No messages yet.</div>
          )
              )
              }
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1 }}
        />
        <button type="submit">Send</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default Forum; 