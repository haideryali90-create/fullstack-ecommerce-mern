import { useEffect, useState } from "react";

function pad(n) {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer({ minutes }) {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  return (
    <div className="flex items-center gap-4 text-center">
      <div>
        <div className="text-2xl font-bold text-gray-900">{pad(days)}</div>
        <div className="text-xs text-gray-500">Days</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{pad(hours)}</div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{pad(mins)}</div>
        <div className="text-xs text-gray-500">Minutes</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{pad(secs)}</div>
        <div className="text-xs text-gray-500">Seconds</div>
      </div>
    </div>
  );
}
