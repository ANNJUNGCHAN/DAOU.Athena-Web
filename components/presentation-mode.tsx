import { FileDown, Presentation } from 'lucide-react';
import './presentation-mode.css';

const presentationPath = '/presentation';

export function PresentationLauncher() {
  return (
    <div className="presentation-actions" aria-label="최종 발표 자료">
      <a
        className="button light presentation-launcher"
        href={`${presentationPath}/paper-final.html`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="15분 프레젠테이션 · 최종 발표 자료 (새 탭에서 열림)"
      >
        <Presentation size={17} aria-hidden="true" /> 15분 프레젠테이션
      </a>
      <a
        className="button light"
        href={`${presentationPath}/ATHENA-최종발표.pdf`}
        download="ATHENA-최종발표.pdf"
      >
        <FileDown size={17} aria-hidden="true" /> 발표 PDF
      </a>
      <a
        className="button light"
        href={`${presentationPath}/ATHENA-최종발표.pptx`}
        download="ATHENA-최종발표.pptx"
      >
        <FileDown size={17} aria-hidden="true" /> 발표 PPT
      </a>
    </div>
  );
}
