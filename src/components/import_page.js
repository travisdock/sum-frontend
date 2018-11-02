import React from 'react';

export default class ImportPage extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API}/api/v1/entries/import`
        let formPackage = new FormData();
        formPackage.append('file', e.target['0'].files['0'])
        formPackage.append('user', "csv")

        const options = {
        method: 'POST',
        body: formPackage
        }
        fetch(url, options)
        .then(res => res.json())
    }

    render() {
        return(
            <form enctype="multipart/form-data" onSubmit={this.handleSubmit} >
                <input id = "fileupload" type = "file" />
                <input type = "submit" value = "submit" id = "submit" />
            </form>
        )
    }
}