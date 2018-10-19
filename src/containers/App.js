import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
//import { robots } from './robots'; 
import './App.css';

//powyżej użyta destrukturyzacja poniewaz robots moze 
//zwrocic (exportowac) rozne wyniki nie jest exportowany poprzez 
//default(tylko dla jednego exportu)


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [], //robots: robots,
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => [this.setState({ robots: users})]);
	}

	onSearchChange = (event) => {

		this.setState({searchfield: event.target.value}) //event zwraca aktualną wartość input
		
		//console.log(filteredRobots);
	}


	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if (this.state.robots.length === 0) {
			return <h1>Loading...</h1>
		} else {
		  return(
			  <div className='tc'>
				  <h1 className= 'f1'>RoboFriends</h1>
				  <SearchBox searchChange={this.onSearchChange} />
				  <Scroll>
				    <CardList robots={filteredRobots}/>
				  </Scroll>
			  </div>
		  );
	   }
	}	
}

//const App = () => {
//	return(
		// <div className='tc'>
			// <h1>RoboFriends</h1>
			// <SearchBox/>
			// <CardList robots={robots}/>
		// </div>
	// )
// }

export default App;