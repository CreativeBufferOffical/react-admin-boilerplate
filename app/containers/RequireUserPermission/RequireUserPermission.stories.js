import React from 'react';
import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';

import Placeholder from 'components/Placeholder';
import reducer, { initialState } from 'containers/App/reducer';
import RequireUserPermission from './index';

const stories = storiesOf('RequireUserPermission', module);
const store = createStore(
  combineReducers({ app: reducer }),
  fromJS({
    app: initialState
      .set(
        'permissionsByName',
        initialState.get('permissionsByName').set('admin', true),
      )
      .set('userLoading', false),
  }),
);

store.dispatch({ type: 'test' });

stories.addDecorator(withKnobs);
stories.addDecorator(story => <Provider store={store}>{story()}</Provider>);

const ConditionalComponent = () => (
  <Placeholder>
    Requires the token <code>admin</code>
    ...
  </Placeholder>
);

stories.add('default', () => (
  <RequireUserPermission token={text('token', 'admin')}>
    <ConditionalComponent />
  </RequireUserPermission>
));
