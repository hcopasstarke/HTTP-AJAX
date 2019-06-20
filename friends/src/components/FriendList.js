import React from "react";
import { Friend } from "../containers/Friend";
import "../styles/FriendList.css";

export class FriendList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let rows = [];

		let rowDel = this.props.onRowDel;
		let onRowAdd = this.props.onRowAdd;
		let onRowSave = this.props.onRowSave;
		let onFilterChange = this.props.onFilterChange;
		let onColumnSort = this.props.onColumnSort;
		let buttonHeaderStyling = this.props.setButtonHeaderStyle;
		let filter = this.props.filterValue;

		this.props.friends.forEach(function(friend) {
			rows.push(
				<Friend
					friend={friend}
					onDelEvent={rowDel}
					onRowSave={onRowSave}
					key={friend.id}
				/>
			);
		});
		rows.push(
			<friend newMode={true} key="addfriend" onRowAdd={onRowAdd} />
		);
		return (
			<div className="friend-list">
				<h1>My Friends:</h1>
				<table className="pure-table pure-table-horizontal table-list">
					<thead>
						<tr>
							<th>
								<button
									name="name"
									onClick={onColumnSort}
									className={buttonHeaderStyling("nameSort")}
								>
									{" "}
									Name{" "}
								</button>
							</th>
							<th>
								<button
									name="age"
									onClick={onColumnSort}
									className={buttonHeaderStyling("ageSort")}
								>
									{" "}
									Age{" "}
								</button>
							</th>
							<th>
								<button
									name="email"
									onClick={onColumnSort}
									className={buttonHeaderStyling("emailSort")}
								>
									{" "}
									Email{" "}
								</button>
							</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						<tr className="pure-table-odd">
							<td>
								<input
									name="name"
									type="text"
									onChange={onFilterChange}
									value={filter.name}
									className="input"
								/>
							</td>
							<td>
								<input
									name="age"
									type="text"
									onChange={onFilterChange}
									value={filter.age}
									className="input"
								/>
							</td>
							<td>
								<input
									name="email"
									type="text"
									onChange={onFilterChange}
									value={filter.email}
									className="input"
								/>
							</td>
							<td />
							<td />
						</tr>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}
