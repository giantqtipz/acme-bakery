import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Thunks/thunks';
import store, { SET_CURRENT } from '../store';

class ChefEdit extends Component {
  state = {
    input: '',
    chefId: window.location.hash.slice(13) // This could also be passed in on props. 
  }

  async componentDidUpdate(prevProps) { //to handle page refresh
    const { chefs } = this.props;
    const { chefId } = this.state;
    if (prevProps.chefs === this.props.chefs) {
      const findChef = chefs.find(chef => chef.id === chefId);
      await store.dispatch({ // not utilzing mapDispatchToProps?
        type: SET_CURRENT,
        current: findChef.name
      })
    }
  }

  async componentDidMount() {
    const { chefs } = this.props;
    const { chefId } = this.state;
    const findChef = chefs.find(chef => chef.id === chefId);
    await store.dispatch({
      type: SET_CURRENT,
      current: findChef.name
    })
  }

  editChef(event) {
    this.setState({ input: event.target.value });
  }

  async updateChef(event) {
    const { updateChef } = this.props;
    const { input, chefId } = this.state;
    const obj = { input, chefId };
    await updateChef(event, obj);
  }

  async deleteChef(event) {
    const { deleteChef } = this.props;
    const { chefId } = this.state;
    await deleteChef(event, chefId);
  }

  render() {
    const { input } = this.state;
    const { current } = this.props;
    return (
      <div className="form-input">
        <h2>Edit Chef</h2>
        <form>
          <input placeholder={current} value={input} onChange={this.editChef.bind(this)} />
          <button onClick={this.updateChef.bind(this)}>Update</button>
          <button className="delete" onClick={this.deleteChef.bind(this)}>Delete</button>
        </form>
        <h4 className="notification"></h4>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefEdit); 