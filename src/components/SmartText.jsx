import { Editor } from '@monaco-editor/react';
import hljs from 'highlight.js';
import { useState } from 'react';
import AlertText from './AlertText';

function SmartText() {
  const [language, setLanguage] = useState('plaintext');
  const [code, setCode] = useState('');
  const alertMessage = `You have exceeded 5000 line count.`;
  const [limitWarning, setLimitWarning] = useState(false);

  const detectLanguage = (value) => {
    setCode(limitLines(value));
    const detectedLang = hljs.highlightAuto(value).language;
    setLanguage(detectedLang || 'plaintext');
  };

  const limitLines = (code) => {
    const lines = code.split(/\r?\n/);
    if (lines.length > 5000) {
      setLimitWarning(true);
      return lines.slice(0, 5000).join('\n');
    } else {
      setLimitWarning(false);
    }

    return code;
  };
  return (
    <>
      <Editor
        height="250px"
        value={code}
        language={language}
        onChange={detectLanguage}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          fontSize: 17.5,
          automaticLayout: true,
          wordWrap: 'on',
          wrappingIndent: 'same',
          scrollBeyondLastLine: false,
        }}
      />
      {limitWarning ? <AlertText text={alertMessage} /> : null}
    </>
  );
}

export default SmartText;
