'use client';
import { Monitor } from 'lucide-react';
import {
  WINDOWS_INSTALLER_FILE,
  WINDOWS_INSTALLER_URL,
} from '@/lib/windows-installer';

export function DownloadButton() {
  return (
    <a
      className="button dark"
      href={WINDOWS_INSTALLER_URL}
      download={WINDOWS_INSTALLER_FILE}
    >
      <Monitor size={17} />
      Download for Windows
    </a>
  );
}
