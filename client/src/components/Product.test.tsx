import React from 'react';
import { render, screen } from '@testing-library/react';
import {IProduct, Product} from './Product';

const handleTest = (product: IProduct) => {
    console.log("handleCart iahsdiashdjksas");
}
const handleTest2 = () => {
    console.log("handleCart iahsdiashdjksas");
}

test('Test creation of a product.', async() => {
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",productCategory:"möbel",price:123,sellerId:1}
    const bed: IProduct = {key: 2, productName:"Bed",productDescription:"Perfect bed. Made for sleeping in.",productCategory:"möbel",price:321,sellerId:1}
    render(<Product prod={soffa} handleCart={handleTest} handleDeleteClick={handleTest2}>{}</Product>)
    expect(screen.getByText(/En fin soffa av hög kvalitet./i)).toBeInTheDocument()
    expect(screen.getByText(/123 KR/i)).toBeInTheDocument()
    let buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(2)
    render(<Product prod={bed} handleCart={handleTest} handleDeleteClick={handleTest2}>{}</Product>)
    buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(4)
    expect(screen.getByText(/Perfect bed. Made for sleeping in./i)).toBeInTheDocument()
});
