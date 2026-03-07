import React from 'react';

export default function QuizLayout({ showModal, children, modal }) {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-82px)] flex-col items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-10">
      {!showModal ? (
        <div className="relative w-full max-w-[38rem] min-h-[34rem] rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-5 py-7 shadow-[var(--shadow-card)] sm:px-8 sm:py-9">
          {children}
        </div>
      ) : (
        <div className="relative">{modal}</div>
      )}
    </div>
  );
}
