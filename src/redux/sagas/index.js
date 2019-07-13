/* eslint-disable */
import { all } from 'redux-saga/effects';

import { watchSignUpUserSagaAsync, watchLogInUserSagaAsync } from './userSaga';
import {
	watchCreateIdeaSagaAsync,
	watchEditIdeaSagaAsync,
	watchUpdateIdeaSagaAsync,
	watchGetAllIdeasSagaAsync,
	watchDeleteIdeaSagaAsync
} from './ideaSaga';

function* rootSaga() {
	yield all([
		watchSignUpUserSagaAsync(),
		watchLogInUserSagaAsync(),
		watchUpdateIdeaSagaAsync(),
		watchEditIdeaSagaAsync(),
		watchCreateIdeaSagaAsync(),
		watchGetAllIdeasSagaAsync(),
		watchDeleteIdeaSagaAsync()
	]);
}

export default rootSaga;
