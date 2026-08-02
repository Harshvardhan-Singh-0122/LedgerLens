import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";

const CsvUploadModal = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef();

  if (!open) return null;

  const handleFile = (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleBrowse = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-lg rounded-3xl bg-[#141C28] border border-[#232B3B] p-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold text-white">
            Import CSV
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>

        </div>

        {/* Drop Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="
            mt-6
            border-2
            border-dashed
            border-violet-500
            rounded-2xl
            p-10
            text-center
          "
        >
          <Upload
            size={42}
            className="mx-auto text-violet-400"
          />

          <h3 className="mt-4 text-white font-medium">
            Drag & Drop CSV Here
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            or
          </p>

          <button
            onClick={() => fileInputRef.current.click()}
            className="
              mt-4
              px-5
              py-2
              rounded-xl
              bg-violet-600
              text-white
            "
          >
            Browse File
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleBrowse}
          />
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="mt-6 flex items-center justify-between bg-[#0B1120] rounded-xl p-4">

            <div className="flex items-center gap-3">

              <FileText className="text-violet-400" />

              <div>

                <p className="text-white text-sm">
                  {selectedFile.name}
                </p>

                <p className="text-gray-400 text-xs">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>

              </div>

            </div>

            <button
              onClick={() => setSelectedFile(null)}
            >
              <X className="text-red-400" />
            </button>

          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              border
              border-[#232B3B]
              text-gray-300
            "
          >
            Cancel
          </button>

          <button
            disabled={!selectedFile}
            className="
              px-5
              py-2
              rounded-xl
              bg-violet-600
              text-white
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Continue
          </button>

        </div>

      </div>

    </div>
  );
};

export default CsvUploadModal;