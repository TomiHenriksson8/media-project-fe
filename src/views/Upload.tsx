import { useState } from "react";
import { useForm } from "../hooks/formHooks";
import { useFile, useMedia } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  }

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return
      }
      // TODO: call postFile function (see below)
      const fileResult = await postFile(file, token)
      // TODO: call postMedia function (see below)
      const mediaResult = await postMedia(fileResult, inputs, token)
      alert(mediaResult.message)
      // TODO: redirect to Home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doUpload, initValues);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded m-10">
        <h1 className="text-2xl font-bold mb-6">Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    name="title"
                    type="text"
                    id="title"
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  bg-slate-300"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    rows={5}
                    id="description"
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-slate-300"
                ></textarea>
            </div>
            <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
                <input
                    name="file"
                    type="file"
                    id="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
            </div>
            <div className="mt-4">
                <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : 'https://via.placeholder.com/200?text=Choose+image'
                    }
                    alt="preview"
                    className="mx-auto h-auto w-48 object-cover rounded"
                />
            </div>
            <button
                type="submit"
                disabled={file && inputs.title.length > 3 ? false : true}
                className="mt-4 w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-600 disabled:bg-slate-200 disabled:text-red-400 disabled:cursor-not-allowed "
            >
                Upload
            </button>
        </form>
    </div>
  );

};


export default Upload;
