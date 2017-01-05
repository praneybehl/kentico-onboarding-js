import React from 'react';

class ListItemEditableText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentText: props.text
    };

    this.confirmChange = this.confirmChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className="form-group">
        <input type="text" className="form-control" value={this.state.currentText} onChange={this.onChange} />
        <button className="btn btn-primary" onClick={this.confirmChange}>Save</button>
        <button className="btn btn-default" onClick={this.props.onCloseEditMode}>Cancel</button>
        <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }

  onChange(event) {
    this.setState({currentText: event.target.value});
  }

  confirmChange() {
    this.props.onUpdate(this.state.currentText);
    this.props.onCloseEditMode();
  }
}

ListItemEditableText.propTypes = {
  text: React.PropTypes.string.isRequired,
  onCloseEditMode: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default ListItemEditableText;
