import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { Placeholder } from './index';

const stories = storiesOf('Placeholder', module);

stories.addDecorator(withKnobs);

stories.add('default', () => (
  <Placeholder>{text('content', 'Lorem ipsum...')}</Placeholder>
));
