// components/ui/CopyableCodeBlock.tsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyableCodeBlockProps {
  children: React.ReactNode;
}

const CopyableCodeBlock: React.FC<CopyableCodeBlockProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    // Get all code elements and preserve line breaks
    const codeLines = React.Children.toArray(children).reduce<string[]>((acc, child) => {
      if (React.isValidElement(child) && child.type === 'code') {
        return [...acc, React.Children.toArray(child.props.children).join('')];
      }
      return acc;
    }, []);

    const textToCopy = codeLines.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find the icon (the non-code child)
  const icon = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type !== 'code'
  );

  return (
    <div className="relative group">
      <div className="flex flex-col items-start space-y-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === 'code') {
            return (
              <div className="flex items-center">
                {icon}
                {child}
              </div>
            );
          }
          return null; // We only want to render code elements here
        })}
      </div>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-1 rounded bg-secondary-200/50 hover:bg-secondary-200 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default CopyableCodeBlock;