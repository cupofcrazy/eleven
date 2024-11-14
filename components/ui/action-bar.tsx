'use client'

import { PlusIcon, ShareIcon } from "lucide-react";
import { UploadForm } from "../upload-form";

export function ActionBar() {
  return <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center justify-center bg-gradient-to-b from-white/0 to-white pointer-events-none z-[50]">
    <div className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm border border-black/10 rounded-full p-2 pointer-events-auto w-40">
        <UploadForm>
          <button className="w-9 h-9 flex items-center justify-center text-black/50 hover:bg-black/5 rounded-full">
            <PlusIcon className="w-5 h-5" />
          </button>
        </UploadForm>
    </div>
  </div>
}