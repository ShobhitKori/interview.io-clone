"use client";

import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

const Editor = ({ code, language, onChange, editorRef }) => {
  const containerRef = useRef(null);
  const monacoEditorRef = useRef(null);
  const prevCodeRef = useRef(code);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Monaco editor
    monacoEditorRef.current = monaco.editor.create(containerRef.current, {
      value: code,
      language: language,
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      fontSize: 14,
      tabSize: 2,
      wordWrap: "on",
      renderLineHighlight: "all",
      scrollbar: {
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    });

    // Set up change event handler
    const changeModelDisposable =
      monacoEditorRef.current.onDidChangeModelContent(() => {
        const value = monacoEditorRef.current.getValue();
        prevCodeRef.current = value;
        onChange(value);
      });

    // Expose editor methods through ref
    if (editorRef) {
      editorRef.current = {
        hasFocus: () => monacoEditorRef.current.hasTextFocus(),
        focus: () => monacoEditorRef.current.focus(),
        getValue: () => monacoEditorRef.current.getValue(),
        setValue: (value) => monacoEditorRef.current.setValue(value),
      };
    }

    // Clean up
    return () => {
      changeModelDisposable.dispose();
      monacoEditorRef.current.dispose();
    };
  }, []);

  // Update editor when language changes
  useEffect(() => {
    if (monacoEditorRef.current) {
      const model = monacoEditorRef.current.getModel();
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  // Update editor content when code prop changes
  useEffect(() => {
    if (monacoEditorRef.current && code !== prevCodeRef.current) {
      // Store cursor position
      const selection = monacoEditorRef.current.getSelection();
      // Update value
      monacoEditorRef.current.setValue(code);
      prevCodeRef.current = code;

      setTimeout(() => {
        if (monacoEditorRef.current) {
          const scrollPosition = monacoEditorRef.current.getScrollPosition();

          if (selection) {
            monacoEditorRef.current.setSelection(selection);
          }
          
          if (scrollPosition) {
            monacoEditorRef.current.setScrollPosition(scrollPosition);
          }
        }
      }, 0);
      // Restore cursor position and scroll
    }
  }, [code]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Editor;

// import React, { useEffect, useRef } from "react";

// import { CodeMirror } from "@codemirror/lang-javascript";

// import { useSocket } from "../context/SocketProvider";

// const Editor = ({ roomid, code, onCodeChange }) => {
//   const socket = useSocket();
//   const editorRef = useRef(null);

//   // Emit changes to all users in the room
//   const handleCodeChange = (editor, data, value) => {
//     onCodeChange(value);
//     socket.emit("code-change", { roomid, code: value });
//   };

//   useEffect(() => {
//     if (!socket) return;

//     // Listen for code updates from the server
//     socket.on("code-change", ({ code }) => {
//       if (editorRef.current) {
//         editorRef.current.setValue(code);
//       }
//     });

//     return () => {
//       socket.off("code-change");
//     };
//   }, [socket]);

//   return (
//     <CodeMirror
//       ref={editorRef}
//       value={code}
//       options={{
//         mode: "javascript",
//         theme: "material",
//         lineNumbers: true,
//       }}
//       onBeforeChange={handleCodeChange}
//     />
//   );
// };

// export default Editor;
