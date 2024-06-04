import { create } from '@storybook/theming/create';
import ReavizLogo from './assets/reaviz.svg';

export default create({
  base: 'dark',
  brandTitle: 'REAVIZ',
  brandUrl: 'https://github.com/reaviz/reaviz',
  brandImage: ReavizLogo,
  colorPrimary: '#0C77FF',
  appContentBg: '#11111F',
  appPreviewBg: '#11111F',
  fontBase: 'Inter,Arial,Helvetica,sans-serif',
  fontCode: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
  appBg: '#11111F',
  textColor: '#FFFFFF',
  barBg: '#11111F',
  appBorderColor: '#1f2937',
  inputBorder: '#1f2937',
  buttonBorder: '#1f2937'
});
