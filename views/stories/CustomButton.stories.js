import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CustomButton from '../src/components/CustomButton.jsx';

storiesOf('CustomButton', module)
  .add('with text', () => <CustomButton text='text' callback={action('click')} />);