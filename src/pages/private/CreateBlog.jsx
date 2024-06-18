import React, { useEffect, useState } from "react";
import MarkdownEditor from "../../components/markdown/MarkdownEditor";
import { createBlog, getBlogDetail, updateBlog } from "../../apis/blog";
import ButtonLoading from "../../components/style/ButtonLoading";
import { toast } from "react-toastify";
import { linkBlog } from "../../utils/contants";
import TitleText from "../../components/style/TitleText";

const inputClass =
    "mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light";

const CreateBlog = ({ isEdit, blog, handleReload }) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(linkBlog[1].value);
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setContent("");
        setTitle("");
        setCategory(linkBlog[1].value);
    };

    const handleSave = async () => {
        setIsLoading(true);
        let res = null;
        if (isEdit)
            res = await updateBlog({ _id: blog._id, title, category, content });
        else res = await createBlog({ title, category, content });
        setIsLoading(false);
        if (res.success) {
            toast.success(res.message);
            reset();
            if (isEdit) handleReload();
        } else {
            toast.error(res.message);
        }
    };

    const fetchContentBlog = async () => {
        const res = await getBlogDetail(blog._id);
        setContent(res.data.content);
    };

    useEffect(() => {
        if (isEdit) {
            setTitle(blog.title);
            setCategory(blog.category);
            fetchContentBlog();
        }
    }, [blog]);

    return (
        <div>
            <TitleText text={(isEdit ? "Update" : "Create") + " blog"} />
            <div className="grid grid-cols-2 gap-x-5">
                <div className="mb-5">
                    <label htmlFor="">Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClass}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="">Category:</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClass}
                        name=""
                        id=""
                    >
                        {linkBlog.map(
                            (item, index) =>
                                index !== 0 && (
                                    <option
                                        key={item.id}
                                        selected={item.value === category}
                                        value={item.value}
                                    >
                                        {item.text}
                                    </option>
                                ),
                        )}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="">Content:</label>
                <MarkdownEditor content={content} setContent={setContent} />
            </div>
            <div className="mt-5 w-fit mx-auto">
                <ButtonLoading
                    handleClick={handleSave}
                    text="Save"
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default CreateBlog;
