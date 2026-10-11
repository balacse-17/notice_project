import { FormEvent, useCallback, useEffect, useState } from "react";
import { BellRing, BookOpen, CheckCircle2, CircleAlert, GraduationCap, Plus, RefreshCw, Send } from "lucide-react";
import NoticeCard, { type Notice } from "./components/NoticeCard";

const API = "http://localhost:5000/api/notices";

export default function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadNotices = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load notices.");
      setNotices(data);
    } catch {
      setError("Cannot connect to the backend or MongoDB. Start the server and check your database connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadNotices(); }, [loadNotices]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    if (!title.trim() || !message.trim()) {
      setError("Title and message are required.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), message: message.trim() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not save the notice.");
      setNotices((current) => [data, ...current]);
      setTitle("");
      setMessage("");
      setStatus("Notice published successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save notice.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><GraduationCap size={23} /></span><span>Campus<span className="brand-light">Board</span></span></a>
        <div className="topbar-right"><span className="live-dot" /> Department Updates <span className="avatar">CSE</span></div>
      </header>

      <main className="main-layout">
        <section className="hero">
          <div className="eyebrow"><span className="eyebrow-line" /> CSE DEPARTMENT <span className="eyebrow-line" /></div>
          <h1>Your campus.<br /><span>Kept in the loop.</span></h1>
          <p className="hero-copy">One place for important announcements, academic updates, and everything happening in your department.</p>
          <div className="hero-pills"><span><BellRing size={15} /> Official notices</span><span><BookOpen size={15} /> Academic updates</span></div>
          <div className="hero-decoration decoration-one" /><div className="hero-decoration decoration-two" />
        </section>

        <section className="content-grid">
          <div className="form-panel">
            <div className="panel-heading"><div><span className="section-kicker">CONTRIBUTE</span><h2>Post an update</h2></div><span className="heading-icon"><Plus size={20} /></span></div>
            <p className="panel-subtitle">Share a useful update with your department.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="notice-title">Notice title</label>
              <input id="notice-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Internal Assessment Schedule" maxLength={120} />
              <label htmlFor="notice-message">Message</label>
              <textarea id="notice-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write the details students should know..." rows={5} maxLength={2000} />
              <button className="submit-button" type="submit" disabled={saving}><Send size={16} /> {saving ? "Publishing..." : "Publish notice"}</button>
            </form>
            {status && <div className="feedback success"><CheckCircle2 size={16} />{status}</div>}
            {error && <div className="feedback error"><CircleAlert size={16} />{error}</div>}
            <p className="form-footnote">Please check the details before publishing.</p>
          </div>

          <div className="notices-panel">
            <div className="notice-heading"><div><span className="section-kicker">WHAT'S HAPPENING</span><h2>Latest notices <span className="count">{notices.length}</span></h2></div><button className="refresh-button" onClick={() => void loadNotices()} title="Refresh notices" aria-label="Refresh notices"><RefreshCw size={16} /></button></div>
            <p className="panel-subtitle">The latest updates from your department.</p>
            {loading ? <div className="empty-state">Loading notices...</div> : error && notices.length === 0 ? <div className="empty-state"><CircleAlert size={22} /><p>Notices could not be loaded.</p><span>Make sure the backend and MongoDB are running.</span></div> : notices.length === 0 ? <div className="empty-state"><BellRing size={24} /><p>It's quiet for now.</p><span>New announcements will appear here.</span></div> : <div className="notice-list">{notices.map((notice) => <NoticeCard key={notice._id} notice={notice} />)}</div>}
          </div>
        </section>
        <footer><span>CampusBoard <span className="footer-dot">·</span> Department Notice Board</span><span>Built for a more connected campus</span></footer>
      </main>
    </div>
  );
}
