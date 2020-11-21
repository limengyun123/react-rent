import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import Route from './router'
import store from './redux/store.js'
import 'antd/dist/antd.min.css'

const render = Component => {
	ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Component />
		</AppContainer>
	</Provider>,
  document.getElementById('root')
);
}

render(Route);

// reportWebVitals();

if (module.hot) {
  module.hot.accept('./router', () => { render(Route) })
}