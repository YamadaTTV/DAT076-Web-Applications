import {Pages} from "../App";
import {ProductPage} from "./ProductPage";
import {SellForm} from "../components/SellForm";
import {AddedToCartForm} from "../components/AddedToCartForm";
import {LoginModal} from "../components/LoginModal";

export function LoginModalPage (props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    return <div>
        <LoginModal page={props.page} handlePage={props.handlePages}/>
        <ProductPage page={props.page} handlePages={props.handlePages}/>
    </div>
}