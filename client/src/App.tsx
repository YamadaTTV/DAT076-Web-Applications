import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button,Row,Col} from 'react-bootstrap'
import {render} from "react-dom";

function App() {
  const soffa: IProduct = {productId:1,productName:"soffa",productCategory:"möbel",price:123,seller:1}
  return (
      <div className="Row">
          <div className="Col-6">
              {Product(soffa)}
          </div>
          <div className="Col-6">
              {Product(soffa)}
          </div>
      </div>
  );
}
interface IProduct {
  productId: number,
  productName: string,
  productCategory: string,
  price: number,
  seller : number,
  buyer ?: number
}


function Product ({productId,productName,productCategory,price,seller} : IProduct){
  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
  );
}

function RegisterUser (){
  return (
      <p>Hello</p>
  );
}

export default App;
