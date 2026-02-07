'use client'

import { useState } from 'react';
import { UploadForm } from './upload-form';

export function UploadModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 text-sm shadow-lg shadow-white/10"
      >
        <span>+</span>
        <span>Fotoğraf Yükle</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-white mb-6">Yeni Fotoğraf Ekle</h2>
            <UploadForm onSuccess={() => setIsOpen(false)} />

          </div>
        </div>
      )}
    </>
  );
}