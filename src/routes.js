import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListGif from './schenes/List-Gif';

class Routes extends Component {
render() {
    return(
			<div>
				<Switch>
					<Route exact path="/" component={ListGif}/>
					<Redirect to="/" />
				</Switch>
			</div>
    );
	}
}

export default Routes;