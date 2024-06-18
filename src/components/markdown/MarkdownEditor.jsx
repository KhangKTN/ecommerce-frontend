import React from 'react'
import { Editor } from '@tinymce/tinymce-react';


const MarkdownEditor = ({content, setContent}) => {
    return (
        <div>
            <Editor
                apiKey='gy7lpyz7hgi0wa9l4v5y36h1kj7tpqmd4cmpzuyt1g09i470'
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    height: '500px',
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                onChange={(e) => setContent(e.target.getContent())}
                initialValue={content}
            />
        </div>
    )
}

export default MarkdownEditor