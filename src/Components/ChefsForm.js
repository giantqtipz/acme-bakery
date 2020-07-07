import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../Thunks/thunks';

class ChefsForm extends Component {
    state = {
        input: ''
    }

    inputChange(event){
        this.setState({input: event.target.value});
    }

    async addChef(event){
        const {addChef} = this.props;
        const {input} = this.state;
        await addChef(event, input);
    }

    render(){
        const {input} = this.state;
        return (
        <div className="form-input">
            <h2>Chefs Listing</h2>
            <form onSubmit={this.addChef.bind(this)}>
            <input placeholder='Enter new Chef' value={input} onChange={this.inputChange.bind(this)}/>
            <button>Add Chef</button>      
            </form>
        </div>
        );
    }
}

export default connect(mapDispatchToProps)(ChefsForm);