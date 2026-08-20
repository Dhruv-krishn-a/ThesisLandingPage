import React from 'react';
import ClientPage from './ClientPage';
import content from '../data/content.json';

export default function Page() {
  return <ClientPage initialContent={content} />;
}
