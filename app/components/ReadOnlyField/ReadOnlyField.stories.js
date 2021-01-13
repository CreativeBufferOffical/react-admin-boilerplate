import React from 'react';
import { storiesOf } from '@storybook/react';

import ReadOnlyField from './index';

const stories = storiesOf('ReadOnlyField', module);

stories.add('ReadOnlyField', () => (
  <ReadOnlyField label="Label" value="value" />
));
