'use client';

import { Map } from 'lucide-react';

export default function LearningMapPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Map className="w-7 h-7 text-violet-600" />
          מפת למידה — לינארית 1
        </h1>
        <p className="text-gray-500 mt-1">
          כל נושאי הקורס לפי שבועות · מה חשוב · על מה כל נושא מבוסס
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
           style={{ height: 'calc(100vh - 160px)' }}>
        <iframe
          src="/linear-flow.html"
          className="w-full h-full border-0"
          title="מפת למידה — לינארית 1"
        />
      </div>
    </div>
  );
}
