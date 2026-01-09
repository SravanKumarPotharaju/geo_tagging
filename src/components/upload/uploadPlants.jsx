import { useUpload } from "../hooks/useUpload";

const UploadPlants = () => {
  const { uploadFiles, uploading } = useUpload();

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    uploadFiles(files);

    
    e.target.value = "";
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        disabled={uploading}
        onChange={handleChange}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-green-600 file:text-white
                   hover:file:bg-green-700
                   disabled:opacity-60"
      />

      {uploading && (
        <p className="mt-2 text-sm text-gray-500">
          Uploading images, please wait…
        </p>
      )}
    </div>
  );
};

export default UploadPlants;
