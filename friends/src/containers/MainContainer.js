import React from "react";
import axios from "axios";
import { FriendList } from "../components/FriendList";
import { propAscSort, propDescSort, inputFilter } from "../utils/Friends";

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.friends = [
			{
				id: "1",
				name: "Person One",
				age: "11",
				email: "container@unomaha.edu"
			},
			{
				id: "2",
				name: "Person Two",
				age: "15",
				email: "guess@gmail.com"
			},
			{
				id: "3",
				name: "Person Three",
				age: "44",
				email: "contact@gmail.com"
			}
		];
		this.state.shownFriends = this.state.friends;
		this.state.filter = {
			name: "",
			age: "",
			email: ""
		};
		this.state.activeSort = "0";

		this.handleRowDel = this.handleRowDel.bind(this);
		this.handleRowAdd = this.handleRowAdd.bind(this);
		this.handleRowSave = this.handleRowSave.bind(this);
		this.handleColumnSort = this.handleColumnSort.bind(this);
		this.buttonHeaderStyling = this.buttonHeaderStyling.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	// CSS methods
	buttonHeaderStyling(buttonName) {
		return (
			(this.state.activeSort === buttonName + "Asc"
				? "button-secondary pure-button"
				: this.state.activeSort === buttonName + "Dsc"
					? "button-tertiary pure-button"
					: "pure-button pure-button-primary") + " button-sort"
		);
	}

	// Method used to filter and sort the list before rerendering it
	applyFilterSort = (friends, activeSort) => {
		friends = friends.filter(
			inputFilter(
				this.state.filter.name,
				this.state.filter.age,
				this.state.filter.email,
			)
		);

		let order = activeSort.substr(-3);
		activeSort = activeSort.replace("Sort" + order, "");

		if (order !== "0") {
			if (order === "Asc") {
				friends = friends.sort(propAscSort(activeSort));
			} else if (order === "Dsc") {
				friends = friends.sort(propDescSort(activeSort));
			}
		}
		return friends;
	};

	// Handling events methods
	handleRowDel(friend) {
		let index = this.state.friends.indexOf(friend);
		let friends = this.state.friends;

		friends.splice(index, 1);
		let shownFriends = this.applyFilterSort(
			friends,
			this.state.activeSort
		);

		let urlDelete = "http://localhost:5000/friends/" + friend.id;

		axios
			.delete(urlDelete, { friend })
			.then(
				this.setState({
					friends: friends,
					shownFriends: shownFriends
				})
			)
			.catch(err => {
				console.log(JSON.stringify(err.config));
			});
	}

	handleRowAdd(friend) {
		// @ToRemove when added with EE
		friend.id = (this.state.friends.length + 1).toString();

		let friends = this.state.friends;
		friends.push(friend);
		let shownFriends = this.applyFilterSort(
			friends,
			this.state.activeSort
		);

		axios
			.post("http://localhost:5000/friends", { friend })
			.then()
			.catch(err => {
				console.log(JSON.stringify(err.config));
			});

		this.setState({
			friends: friends,
			shownFriends: shownFriends
		});
	}

	handleRowSave(friend) {
		console.log(JSON.stringify(friend));
		// Save on API

		// SetState w/ new friend in place of the old one
		// find a way to get the ID back from the Row to add it
	}

	handleFilterChange(evt) {
		let filters = this.state.filter;
		filters[evt.target.name] = evt.target.value;
		let shownFriends = this.state.friends.filter(
			inputFilter(filters.name, filters.age, filters.email)
		);
		this.setState({ filter: filters, shownFriends: shownFriends });
	}

	handleColumnSort(evt) {
		let buttonName = evt.target.name + "Sort";

		let shownFriends = this.state.shownFriends;

		if (this.state.activeSort === buttonName + "Asc") {
			shownFriends = shownFriends.sort(propDescSort(evt.target.name));
			this.setState({
				activeSort: buttonName + "Dsc",
				shownFriends: shownFriends
			});
		} else {
			shownFriends = shownFriends.sort(propAscSort(evt.target.name));
			this.setState({
				activeSort: buttonName + "Asc",
				shownFriends: shownFriends
			});
		}
	}

	// Lifecycle Methods
	componentDidMount() {
		axios
			.get("http://localhost:5000/friends")
			.then(res => {
				let shownFriends = this.applyFilterSort(
					res.data,
					this.state.activeSort
				);
				this.setState({
					friends: res.data,
					shownFriends: shownFriends
				});
			})
			.catch(err => {
				console.log(JSON.stringify(err.config));
			});
	}

	render() {
		return (
			<FriendList
				friends={this.state.shownFriends}
				filterValue={this.state.filter}
				onRowDel={this.handleRowDel}
				onRowAdd={this.handleRowAdd}
				onRowSave={this.handleRowSave}
				onFilterChange={this.handleFilterChange}
				onColumnSort={this.handleColumnSort}
				setButtonHeaderStyle={this.buttonHeaderStyling}
			/>
		);
	}
}