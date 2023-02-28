import React from 'react';
import { render, screen } from '@testing-library/react';
import {IProduct, Product} from './Product';



test('Test creation of a product.', async() => {
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",productCategory:"möbel",price:123,seller:1}
    const bed: IProduct = {key: 2, productName:"Bed",productDescription:"Perfect bed. Made for sleeping in.",productCategory:"möbel",price:321,seller:1}
    render(<Product prod={soffa}>{}</Product>)
    expect(screen.getByText(/En fin soffa av hög kvalitet./i)).toBeInTheDocument()
    expect(screen.getByText(/123 KR/i)).toBeInTheDocument()
    let buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(2)
    render(<Product prod={bed}>{}</Product>)
    buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(4)
    expect(screen.getByText(/Perfect bed. Made for sleeping in./i)).toBeInTheDocument()
});
