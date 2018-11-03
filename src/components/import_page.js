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
        formPackage.append('file', e.target['0'].files['0'])
        formPackage.append('user_id', this.props.current_user.user_id)

        const options = {
        method: 'POST',
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
            <div>
                { this.state.loading
                ?
                <PulseLoader
                        sizeUnit={"px"}
                        size={26}
                        color={'#00A0C2'}
                        loading={this.state.loading}
                        />
                :
                <form encType="multipart/form-data" onSubmit={this.handleSubmit} >
                    <input id = "fileupload" type = "file" />
                    <input type = "submit" value = "submit" id = "submit" />
                </form>
                }
            </div>
        )
    }
};

const mapStateToProps = state => ({
    current_user: state.current_user
});
export default connect(mapStateToProps, { updateCategories })(ImportPage)