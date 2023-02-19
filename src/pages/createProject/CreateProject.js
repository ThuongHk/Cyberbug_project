import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as yup from 'yup'

const CreateProject = () => {

    
    const formik = useFormik({        
        initialValues: {
            projectName: '',
            description: ''
        },
        onSubmit: values => {
            // console.log(values);
        }
    })
    const editorRef = useRef(null);
    const log = () => {       
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };    
    return (
        <div>
            <h3>CreateProject</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input className='form-control'
                        name='projectName'
                        value={formik.values.projectName}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        name='description'
                        value={formik.values.description}
                        onEditorChange={()=>{formik.setFieldValue('description', editorRef.current.getContent())}}

                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}

                    />

                </div>
                <div className="form-group">
                    <select className='form-control' name='categoriId'>
                        <option value='web'>Web</option>
                        <option value='software'>Software</option>
                        <option value='app'>App</option>
                    </select>
                </div>
                <button onClick={log} className='btn btn-outline-primary'>Create Project</button>
            </form>
        </div>
    )
}

export default CreateProject