import React from "react";

export class FriendRow extends React.Component {
	render() {
		var onEditEvent = this.props.onEditEvent;
		var onDelEvent = this.props.onDelEvent;
		var friend = this.props.friend;

		return (
			<tr>
				<td>{friend.name}</td>
				<td>{friend.age}</td>
				<td>{friend.email}</td>
				<td>
					<button
						onClick={onEditEvent}
						className="button-secondary pure-button"
					>
						Edit
					</button>
				</td>
				<td>
					<button onClick={onDelEvent} className="button-error pure-button">
						Delete
					</button>
				</td>
			</tr>
		);
	}
}