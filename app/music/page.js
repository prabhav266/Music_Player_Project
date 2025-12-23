// app/music/page.js
'use client';

import React from 'react';

const G1page = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/legacy-pages/musicplayer.html"
        style={{ border: 'none', width: '100%', height: '100%' }}
        title="Music Player"
      />
    </div>
  );
};

export default G1page;
