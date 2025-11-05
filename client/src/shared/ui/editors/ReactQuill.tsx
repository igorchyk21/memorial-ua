"use client";
import dynamic from "next/dynamic";
import React, { forwardRef, useMemo } from "react";
import "./css/quill.css";
import { formatsReactQuill } from "./const/formatsReactQuill";
import useReactQuillSimple, { WebpOptimizionType } from "./model/useReactQuillSimple";
import ReactQuillSpinner from "./ReactQuillSpinner";
import { stripHtmlAttrs } from "../../helper/string/stripHtmlAttrs";

// 1) Динамічний імпорт (без SSR)
const QuillNoSSR = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

// 2) Обгортка з forwardRef, щоб TS дозволив ref
type ReactQuillProps = React.ComponentProps<any>; // спростимо типи (або опиши інтерфейс детальніше)
const ReactQuillWithRef = forwardRef<any, ReactQuillProps>((props, ref) => {
  return <QuillNoSSR ref={ref} {...props} />;
});
ReactQuillWithRef.displayName = "ReactQuillWithRef";

interface Props {
  value: string;
  onChange: (value: string) => void;
  webpOptimizion?: WebpOptimizionType;
  uploadImageFunction?: ((file: File) => Promise<string | null>) | null;
  readOnly?: boolean;
  disabled?: boolean;
  stickyMode?:boolean;
  stickyTop?:number;
  darkTheme?:boolean;
}

export default function ReactQuillSimple({
  value,
  onChange,
  webpOptimizion,
  uploadImageFunction,
  readOnly = false,
  disabled = false,
  stickyMode = false,
  stickyTop = 0,
  darkTheme = false,
}: Props) {
  const { attachRef, modules } = useReactQuillSimple(webpOptimizion, uploadImageFunction);
 
  return (
    <div className={`position-relative rounded-4 border- border p-2 ${stickyMode ? 'quill-sticky' : ''}`}>
    <ReactQuillSpinner show={disabled} darkTheme={darkTheme}/> 
    <ReactQuillWithRef
      ref={attachRef}                // ← тепер TS не лається
      readOnly={readOnly}
      theme="snow"
      modules={modules}
      formats={formatsReactQuill}
      value={value}
      onChange={(v:string)=>{
        onChange(v)
         
      }}
    />
    <style jsx global>{`
        .quill-sticky .ql-toolbar.ql-snow {
          position: sticky;
          top: ${stickyTop}px;
          z-index: 2;
        }

      `}</style>
    </div>
  );
}
