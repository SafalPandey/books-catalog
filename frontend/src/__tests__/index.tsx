import { screen } from '@testing-library/react';

describe('Entrypoint: index', () => {
  it('imports without crashing', async () => {
    const root = document.createElement('div');
    root.id = "root";
    document.body.appendChild(root);

    const app = await require('../index');

    expect(app).toBeDefined();

    const element = screen.getByText(/books catalog/i);

    expect(element).toBeInTheDocument();
  });
});
