import React from "react";
import { FriendRow } from "../components/rows/FriendRow";
import { EditFriendRow } from "../components/rows/EditFriendRow";
import { AddFriendRow } from "../components/rows/AddFriendRow";

export class Friend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: true,
			name: "",
			age: "",
			email: ""
		};

		if (this.props.editMode) this.state.editMode = true;
		if (this.props.newMode) this.state.newMode = true;
		// this.state.friend = this.props.friend;
		this.state.friend = {
			editMode: true,
			name: "",
			age: "",
			email: ""
		};
		this.handleRowEdit = this.handleRowEdit.bind(this);
		this.handleRowSave = this.handleRowSave.bind(this);
		this.handleRowCreate = this.handleRowCreate.bind(this);
		this.newRowCellChange = this.newRowCellChange.bind(this);
		this.editOnCellChange = this.editOnCellChange.bind(this);
	}

	handleRowCreate() {
		let friend = {
			name: this.state.name,
			age: this.state.age,
			email: this.state.email
		};
		this.props.onRowAdd(friend);
		this.setState({
			name: "",
			age: "",
			email: ""
		});
	}

	handleDeleteClick = () => {
		this.props.onDelEvent(this.props.friend);
	};

	newRowCellChange(evt) {
		var item = {
			name: evt.target.name,
			value: evt.target.value
		};
		this.setState({ [item.name]: item.value });
	}

	editOnCellChange(evt) {
		let friend = this.state.friend;
		friend[evt.target.name] = evt.target.value;
		this.setState({
			friend: friend
		});
	}

	handleRowEdit() {
		this.setState({ editMode: false });
	}

	handleRowSave() {
		this.setState({ editMode: true });
		this.props.onRowSave(this.state.friend);
	}

	render() {
		let friend = this.props.friend;
		let editMode = this.state.editMode;
		let newMode = this.state.newMode;
		let rowDel = this.handleDeleteClick;
		let newRowCellChange = this.newRowCellChange;
		let editOnCellChange = this.editOnCellChange;

		let rendering;

		if (newMode) {
			rendering = (
				<AddFriendRow
					onSaveEvent={this.handleRowCreate}
					onCellChange={newRowCellChange}
					name={this.state.name}
					age={this.state.age}
					email={this.state.email}
				/>
			);
		} else {
			if (editMode) {
				rendering = (
					<EditFriendRow
						friend={friend}
						onDelEvent={rowDel}
						onSaveEvent={this.handleRowSave}
						onCellChange={editOnCellChange}
					/>
				);
			} else {
				rendering = (
					<FriendRow
						friend={friend}
						onDelEvent={rowDel}
						onEditEvent={this.handleRowEdit}
					/>
				);
			}
        }
		return rendering;
	}
}
