import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import EnigmaReducer from './enigma/Reducers';
import CipherReducer from './cipher/Reducers';
import LorenzReducer from './lorenz/Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
	enigma: EnigmaReducer,
	cipher: CipherReducer,
	lorenz: LorenzReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewareEnhancer = applyMiddleware(...[thunkMiddleware])

const cipherStore = createStore(rootReducer, composeWithDevTools(
	middlewareEnhancer
));

export default cipherStore;
