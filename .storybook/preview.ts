import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|stroke)/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#020617' },
        { name: 'surface', value: '#1E293B' },
        { name: 'card',    value: '#0F172A' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  a11y: {
    test: 'todo'
  },
};

export default preview;