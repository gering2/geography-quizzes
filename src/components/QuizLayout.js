import React from 'react';

export default function QuizLayout({ showModal, children, modal }) {
  return (
    <div className="relative flex items-center justify-center overflow-y-auto h-full flex-col bg-[#e5eaf1] px-4 py-8 [background-image:linear-gradient(to_right,rgba(100,116,139,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.12)_1px,transparent_1px)] [background-size:32px_32px]">
      {!showModal ? (
        <div className="relative bg-[#f8fafc] w-full max-w-[34rem] min-h-[34rem] rounded-xl border border-[#d6dee8] shadow-2xl px-6 py-8">
          {children}
        </div>
      ) : (
        <div className="relative">{modal}</div>
      )}
    </div>
  );
}
