import React from "react";

export class EditFriendRow extends React.Component {
	render() {
		var friend = this.props.friend;
		var onSaveEvent = this.props.onSaveEvent;
		let onDelEvent = this.props.onDelEvent;
		let onCellChange = this.props.onCellChange;

		return (
			<tr>
				<td>
					<input
						type="text"
						id={friend.id}
						name="name"
						defaultValue={friend.name}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<input
						type="text"
						id={friend.id}
						name="age"
						defaultValue={friend.age}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<input
						type="text"
						id={friend.id}
						name="email"
						defaultValue={friend.email}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<button onClick={onSaveEvent} className="button-success pure-button">
						Update
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
