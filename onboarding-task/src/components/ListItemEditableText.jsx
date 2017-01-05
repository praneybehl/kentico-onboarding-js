import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ListItemEditableText extends React.Component {
  static propTypes = {
    item: ImmutablePropTypes.contains({
      text: React.PropTypes.string.isRequired
    }).isRequired,
    onCloseEditMode: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      currentText: props.item.get('text')
    };

    this._confirmChange = this._confirmChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.setState({currentText: event.target.value});
  }

  _confirmChange() {
    this.props.onUpdate(this.state.currentText);
    this.props.onCloseEditMode();
  }

  render() {
    return (
      <div className="form-group">
        <input type="text" className="form-control" value={this.state.currentText} onChange={this._onChange}/>
        <button className="btn btn-primary" onClick={this._confirmChange}>Save</button>
        <button className="btn btn-default" onClick={this.props.onCloseEditMode}>Cancel</button>
        <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

export default ListItemEditableText;
