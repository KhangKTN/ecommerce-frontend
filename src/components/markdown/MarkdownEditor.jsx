import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MarkdownEditor = ({content, setContent}) => {
    return (
        <div>
            <CKEditor
                editor={ ClassicEditor }
                onChange={(event, editor) => {
                    setContent(editor.getData())
                }}
                data={content}
            />
        </div>
    )
}

export default MarkdownEditor