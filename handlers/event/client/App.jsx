import React, { Component, PropTypes, } from 'react';
import { reduxForm, Field } from 'redux-form';


import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </div>
    );
}

class App extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    onSubmit(data) {
        let  myHeaders = new Headers();

        var boundary = Date.now();


        console.info('This is expected to fail:', data.files[0].name);


        myHeaders.append('Content-Type', 'multipart/form-data; boundary=' + boundary);
        myHeaders.append('Content-Disposition', 'form-data; name="photo"; filename="blob"'  );


        myHeaders.append('Content-Disposition: form-data; name=' + data.files[0].name);



        let myInit = { method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };

        let myRequest = new Request('imgur/upload', myInit);
        /*
         var body = new FormData();



         Object.keys(data).forEach(( key ) => {
         console.info('POST', data[ key ]);
         //if(key == "files")
         body.append(key, data[ key ]);

         });


         */





        fetch(myRequest)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        const {
            handleSubmit,
            reset,
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <label htmlFor={FILE_FIELD_NAME}>Files</label>
                    <Field
                        name={FILE_FIELD_NAME}
                        component={renderDropzoneInput}
                    />
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                    <button onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'simple',
})(App);