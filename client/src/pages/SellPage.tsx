import {Pages} from "../App";
import {ProductPage} from "./ProductPage";
import {SellForm} from "../components/SellForm";

export function SellPage (props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    return <div>
        <SellForm page={props.page} handlePages={props.handlePages}/>
        <ProductPage page={props.page} handlePages={props.handlePages}/>
    </div>
}