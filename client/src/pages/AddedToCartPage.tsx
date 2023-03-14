import {Pages} from "../App";
import {ProductPage} from "./ProductPage";
import {SellForm} from "../components/SellForm";
import {AddedToCartForm} from "../components/AddedToCartForm";

export function AddedToCartPage (props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    return <div data-testid="AddedToCartPage">
        <AddedToCartForm page={props.page} handlePage={props.handlePages}/>
        <ProductPage page={props.page} handlePages={props.handlePages}/>
    </div>
}