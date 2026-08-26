import "./fileUpload.css";
import { ReactNode, useRef, useState } from "react";

type FileUploadButtonProps = {
  children: ReactNode;
  accept?: string;
  pending?: boolean;
  label?: string;
  onFile: (file: File) => void;
};

export default function FileUpload({
  children,
  accept,
  pending,
  label,
  onFile,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragover, setDragover] = useState(false);

  function isAccepted(file: File) {
    if (!accept) {
      return true;
    }

    return accept.split(",").some((part) => {
      const rule = part.trim().toLowerCase();

      // file extensions
      if (rule.startsWith(".")) {
        return file.name.toLowerCase().endsWith(rule);
      }

      if (rule.endsWith("/*")) {
        return file.type.startsWith(rule.slice(0, -1));
      }

      return file.type === rule;
    });
  }

  function handleFile(file: File | undefined) {
    if (pending) return;

    if (!file) {
      return;
    }

    if (!isAccepted(file)) {
      console.log("unaccepted file type", file);
      return;
    }

    onFile(file);
  }

  return (
    <>
      <button
        className={`file-upload__button ${dragover ? "file-upload__button--drag-over" : ""}`}
        aria-label={label}
        disabled={pending}
        type="button"
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          handleFile(file);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragover(true);
        }}
        onDragLeave={() => setDragover(false)}
        onClick={() => inputRef.current?.click()}
      >
        {pending ? "..." : children}
      </button>
      <input
        disabled={pending}
        ref={inputRef}
        className="file-upload__input"
        type="file"
        accept={accept}
        onInput={(event) => {
          handleFile(event.currentTarget.files?.[0]);
          event.currentTarget.value = "";
        }}
      />
    </>
  );
}
