import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import CipherContainer from './components/CipherContainer';
import cipherStore from './store/Index';
import './index.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Search from './components/Search';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Route path="/" exact component={Search} />
			<Route path="/enigma" component={CipherContainer} />
			<Route path="/lorenz" component={CipherContainer} />
			<Route path="/caesarcipher" component={CipherContainer} />
			<Route path="/vigenerecipher" component={CipherContainer} />
			<Route path="/vernamcipher" component={CipherContainer} />
		</Router>
	</Provider>
);

ReactDOM.render(<Root store={cipherStore} />, document.getElementById('root'));
