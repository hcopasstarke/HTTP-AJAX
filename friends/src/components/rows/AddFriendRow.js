import React from "react";

export class AddFriendRow extends React.Component {
  render() {
    var onSaveEvent = this.props.onSaveEvent;
    let cellChange = this.props.onCellChange;

    return (
      <tr>
        <td>
          <input
            type="text"
            name="name"
            value={this.props.name}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <input
            type="text"
            name="age"
            value={this.props.age}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <input
            type="text"
            name="email"
            value={this.props.email}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <button onClick={onSaveEvent} className="button-success pure-button">
            Save
          </button>
        </td>
        <td />
      </tr>
    );
  }
}