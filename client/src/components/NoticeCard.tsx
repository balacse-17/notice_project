import { CalendarDays, Megaphone } from "lucide-react";

export type Notice = {
  _id: string;
  title: string;
  message: string;
  createdAt?: string;
};

type Props = { notice: Notice };

export default function NoticeCard({ notice }: Props) {
  const date = notice.createdAt
    ? new Date(notice.createdAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "Recently added";

  return (
    <article className="notice-card">
      <div className="notice-icon"><Megaphone size={19} /></div>
      <div className="notice-content">
        <div className="notice-card-top">
          <h3>{notice.title}</h3>
          <span className="notice-tag">Notice</span>
        </div>
        <p>{notice.message}</p>
        <div className="notice-date"><CalendarDays size={14} /> {date}</div>
      </div>
    </article>
  );
}
