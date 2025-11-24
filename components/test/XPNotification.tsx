import React, { useEffect, useState } from 'react';

interface XPNotificationProps {
  message: string;
  show: boolean;
}

const XPNotification: React.FC<XPNotificationProps> = ({ message, show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-8 z-50 animate-in fade-in slide-in-from-right duration-500">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce border-4 border-white">
        <span className="text-3xl">🎉</span>
        <span className="font-montserrat font-bold text-xl">{message}</span>
      </div>
    </div>
  );
};

export default XPNotification;
