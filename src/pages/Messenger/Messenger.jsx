
import React, { useMemo, useRef, useState, useEffect } from "react";
import Header from '../../components/Header';

const initialContacts = [
  { id: "u1", name: "Anna Wright", last: "Спасибо!", time: "15:20", unread: 3 },
  { id: "u2", name: "Kristin Harris", last: "Можно перенести?", time: "14:45", unread: 1 },
  { id: "u3", name: "Tyler Cooper", last: "Ок, договорились", time: "13:05", unread: 0 },
  { id: "u4", name: "Darlene Robertson", last: "До завтра", time: "09:12", unread: 0 },
];

const initialThreads = {
  u1: [
    { id: "m1", from: "them", text: "Привет! Когда старт курса?", time: "15:10" },
    { id: "m2", from: "me", text: "Стартуем в понедельник, я пришлю доступы.", time: "15:12" },
    { id: "m3", from: "them", text: "Спасибо!", time: "15:20" },
  ],
  u2: [
    { id: "m1", from: "them", text: "Можно перенести занятие на завтра?", time: "14:45" },
  ],
  u3: [
    { id: "m1", from: "me", text: "Ок, договорились", time: "13:05" },
  ],
  u4: [
    { id: "m1", from: "them", text: "До завтра", time: "09:12" },
  ],
};

export default function Messenger() {
  const [contacts, setContacts] = useState(initialContacts);
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState(contacts[0]?.id ?? null);

  const [contactQuery, setContactQuery] = useState("");
  const [messageQuery, setMessageQuery] = useState("");
  const [draft, setDraft] = useState("");

  const messagesEndRef = useRef(null);

  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  // Фильтрация контактов
  const filteredContacts = useMemo(() => {
    const q = contactQuery.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) => c.name.toLowerCase().includes(q));
  }, [contacts, contactQuery]);

  // Текущая переписка + фильтр по тексту
  const activeMessages = useMemo(() => {
    const msgs = threads[activeId] || [];
    const q = messageQuery.trim().toLowerCase();
    if (!q) return msgs;
    return msgs.filter((m) => m.text.toLowerCase().includes(q));
  }, [threads, activeId, messageQuery]);

  // Скроллим вниз при смене диалога/отправке сообщения
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, activeMessages.length]);

  // Выбор контакта, сбрасываем счетчик непрочитанных
  const handleSelectContact = (id) => {
    setActiveId(id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
    setSidebarOpen(false); // NEW: закрываем панель на мобилке
  };

  // Отправка сообщений (Enter — отправить, Shift+Enter — перенос строки)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !activeId) return;

    const newMsg = {
      id: "m" + Date.now(),
      from: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }));

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, last: text, time: newMsg.time } : c
      )
    );

    setDraft("");
  };

  return (
    <>
    <Header />    
    <div className="chat">
       
       <button
        className={`chat__backdrop ${isSidebarOpen ? "is-visible" : ""}`}
        aria-hidden={!isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Левая колонка (1/5) */}
      <aside className={`chat__sidebar ${isSidebarOpen ? "is-open" : ""}`}>
        <div className="chat__sidebar-search">
          <input
            className="chat__input"
            type="text"
            placeholder="Search contact…"
            value={contactQuery}
            onChange={(e) => setContactQuery(e.target.value)}
          />
        </div>

        <div className="chat__contact-list">
          {filteredContacts.map((c) => (
            <button
              key={c.id}
              className={`chat__contact ${activeId === c.id ? "is-active" : ""}`}
              onClick={() => handleSelectContact(c.id)}
            >
              <div className="chat__contact-avatar" aria-hidden />
              <div className="chat__contact-meta">
                <div className="chat__contact-row">
                  <span className="chat__contact-name">{c.name}</span>
                  <span className="chat__contact-time">{c.time}</span>
                </div>
                <div className="chat__contact-row">
                  <span className="chat__contact-last">{c.last}</span>
                  {c.unread > 0 && <span className="chat__badge">{c.unread}</span>}
                </div>
              </div>
            </button>
          ))}
          {filteredContacts.length === 0 && (
            <div className="chat__empty">No contacts found</div>
          )}
        </div>
      </aside>

      {/* Правая область (4/5): верх — сообщения (4/5 высоты), низ — ввод (1/5) */}
      <section className="chat__main">
        <header className="chat__header">
          {/* КНОПКА ОТКРЫТИЯ САЙДБАРА НА МОБИЛКЕ */} {/* NEW */}
          <button
            className="chat__btn chat__btn--menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open contacts"
          >
            ☰
          </button>

          <div className="chat__header-title">
            {contacts.find((c) => c.id === activeId)?.name || "Select a contact"}
          </div>

          <div className="chat__header-search">
            <input
              className="chat__input"
              type="text"
              placeholder="Search in conversation…"
              value={messageQuery}
              onChange={(e) => setMessageQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="chat__messages">
          {activeMessages.map((m) => (
            <div key={m.id} className={`bubble bubble--${m.from === "me" ? "out" : "in"}`}>
              <div className="bubble__text">{m.text}</div>
              <div className="bubble__meta">{m.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {activeMessages.length === 0 && (
            <div className="chat__empty chat__empty--messages">No messages</div>
          )}
        </div>

        <footer className="chat__composer">
          <textarea
            className="chat__textarea"
            placeholder="Type your message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          <button className="chat__send" onClick={sendMessage} title="Send (Enter)">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
            <span>Send</span>
          </button>
        </footer>
      </section>
    </div>
    </>
  );
}
