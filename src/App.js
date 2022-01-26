import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		search: '',
		images: [],
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const api = '1984111-80063ba8cb2e514a8b70d062c';
		const value = this.state.search;
		const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=50&q=${value}&key=${api}`;
		var self = this;
		axios
			.get(url)
			.then(function (response) {
				// handle success
				self.setState({
					images: response.data.hits,
				});
			})
			.catch(function (error) {
				// handle error
				alert('something went wrong!');
			});
	};
	handleChange = (event) => {
		this.setState({ search: event.target.value });
	};

	render() {
		const { images } = this.state;
		console.log(images);
		const listItems = images.map((image, index) => (
			<a key={index} href={image.pageURL}>
				<img src={image.largeImageURL} />
			</a>
		));

		return (
			<div>
				<h1>Image Search</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="search">
						<div>
							<input
								name="search"
								value={this.state.search}
								type="text"
								placeholder="Type keyword and hit enter"
								onChange={this.handleChange}
							/>
							<button type="submit">Submit</button>
						</div>
					</div>
				</form>
				<div className="search-result">{listItems}</div>
			</div>
		);
	}
}

export default App;
