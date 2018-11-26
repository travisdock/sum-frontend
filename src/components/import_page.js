import React from 'react';
import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { updateCategories } from '../actions';
class ImportPage extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    state = {
        loading: false
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        const url = `${process.env.REACT_APP_API}/api/v1/entries/import`
        let formPackage = new FormData();
        const token = localStorage.getItem('jwt')
        formPackage.append('file', e.target['0'].files['0'])
        formPackage.append('user_id', this.props.current_user.user_id)
        const options = {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: formPackage
        }
        fetch(url, options)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({loading: false});
                alert(resp.message);
                if ( Object.prototype.toString.call( resp.categories ) === '[object Array]' ) {
                    this.props.updateCategories(resp.categories)
                }
            });
    };

    render() {
        return(
            <div className="upper_third">
                { this.state.loading
                ?
                <PulseLoader
                        sizeUnit={"px"}
                        size={26}
                        color={'#00A0C2'}
                        loading={this.state.loading}
                        className={"loading"}
                        />
                :
                <div className="import_container">
                    <h2>Upload CSV</h2>
                    <p align='center'>
                        You can upload csv files of previous financial information as long
                        as it has Date, Category, Amount, and Note headers(case sensitive). 
                        It works best if the date category is formatted as a date in excel 
                        or google sheets before it is exported to csv. Any categories that 
                        do not already exist in your account will be created as a regular 
                        expense category.
                    </p>
                    <div className="img_container">
                    <img src='/import_example.png' alt="example format screenshot"></img>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.handleSubmit} >
                        <input id = "fileupload" type = "file" />
                        <input type = "submit" value = "submit" id = "submit" />
                    </form>
                </div>
                }
            </div>
        )
    }
};

const mapStateToProps = state => ({
    current_user: state.current_user
});
export default connect(mapStateToProps, { updateCategories })(ImportPage);
export const nakedImportPage = ImportPage;