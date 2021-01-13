import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Placeholder from 'components/Placeholder';
import ErrorModal from './index';

const stories = storiesOf('ErrorModal', module);

stories.addDecorator(withKnobs);
const isHidden = false;
stories.add('default', () => (
  <Placeholder>
    <ErrorModal
      isOpen={!isHidden}
      onClose={() => !isHidden}
      title="Message Title"
      message="This is the test message for the message pop-up control which be will be closed when you click outside the box. The box will be displayed centered on the screen."
    />
  </Placeholder>
));

/* stories.add('default', () => (
    React.createElement(() => {
        const [state, setState] = React.useState(false)
    return (<Placeholder>
        {!isHidden && (
        <ErrorModal
            onClose={() => setState(!state)}
            title={('title', 'Message Title')}
            message={('message', 'This is the test message for the message pop-up control which be will be closed when you click outside the box. The box will be displayed centered on the screen.')}
            />
        )}
    <button type="button" onClick={() => setState(!state)}>
     Show System Message
    </button>
    </Placeholder>)
    })
  )); */
