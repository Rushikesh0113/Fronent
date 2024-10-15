import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const ReplyEditor = ({ parentId, refreshComments }) => {
    const [editorContent, setEditorContent] = useState('');
    const [loading, setLoading] = useState(false);
    const quillRef = useRef();

    const suggestionTitle = useRef();

    const handleChange = (content) => {
        setEditorContent(content);
    };

    const handleSubmit = async () => {
        try {
            axios.defaults.withCredentials = true;
            if (!editorContent) {
                console.log("All fields are required.");
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/api/topics/${parentId}/replies`, {
                topic_comment: editorContent,
                title: suggestionTitle?.current?.value
            });
            refreshComments();
            setEditorContent('');  // Clear the editor after submitting
        } catch (error) {
            console.error("There was an error posting the reply!", error);
        }
    };

    const fileHandler = async (fileType) => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", fileType === "image" ? "image/*" : "application/pdf");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const isImage = /^image\//.test(file.type);
                const isPdf = /^application\/pdf$/.test(file.type);

                if (isImage || isPdf) {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                        axios.defaults.withCredentials = true;
                        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/single`, formData);
                        const url = res.data.data;
                        const range = editor.getSelection();

                        if (isImage) {
                            editor.insertText(range.index, "\n");
                            editor.insertEmbed(range.index + 1, "image", url, "user");
                            editor.insertText(range.index + 2, "\n");
                        } else if (isPdf) {
                            const linkHtml = `<a href="${url}" target="_blank">${file.name}</a>`;
                            editor.clipboard.dangerouslyPasteHTML(range.index, linkHtml);
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    console.log('You can only upload images or PDFs.');
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike", "link"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }],
                [{ 'color': [] }, { 'background': [] }],
                ['formula'],
                ['image', "video"],
            ],
            handlers: {
                image: () => fileHandler('image'),
                video: () => fileHandler('pdf')
            }
        },
    }), []);

    return (
        <div className="p-4 border rounded-lg shadow-md">
            {loading && (
                <div id="toast-bottom-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                    <div className="text-sm font-normal">The file is uploading...</div>
                </div>
            )}

            <ReactQuill
                theme="snow"
                ref={quillRef}
                value={editorContent}
                modules={modules}
                onChange={handleChange}
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-[#FF725E] text-white rounded-xl transition hover:delay-50 hover:scale-105"
            >
                Submit Reply
            </button>
        </div>
    );
};

export default ReplyEditor;