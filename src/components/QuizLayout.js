import React from 'react';

export default function QuizLayout({ showModal, children, modal }) {
  return (
    <div className="flex items-center justify-center overflow-y-auto h-full flex-col bg-gradient-to-b from-[#1f1a1a] via-[#181515] to-[#120f0f] px-4 py-8">
      {!showModal ? (
        <div className="bg-gray-100 w-full max-w-[34rem] min-h-[34rem] rounded-xl border border-white/40 shadow-2xl px-6 py-8">
          {children}
        </div>
      ) : (
        modal
      )}
    </div>
  );
}
