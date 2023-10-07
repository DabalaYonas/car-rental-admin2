import { useEffect, useState } from "react";
import { LookupCard } from "./component/LookupCard";
import { getBrands, getCategories, getColors, getEngines, getModels, getTransmissions } from "./datas/lookup";


function SettingPage() {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [engines, setEngines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getBrands().then(data => {
                setBrands([]);
                data.forEach(element => {
                    setBrands(items => ([...items, [element.id, element.brand]]));
                });
            });
            
            getEngines().then(data => {
                setEngines([]);
                data.forEach(element => {
                    setEngines(items => ([...items, [element.id, element.engine]]));
                });
            });
            
            getCategories().then(data => {
                setCategories([]);
                data.forEach(element => {
                    setCategories(items => ([...items, [element.id, element.category]]));
                });
            });

            getTransmissions().then(data => {
                setTransmissions([]);
                data.forEach(element => {
                    setTransmissions(items => ([...items, [element.id, element.transmission]]));
                });
            });

            getModels().then(data => {
                setModels([]);
                data.forEach(element => {
                    setModels(items => ([...items, [element.id, element.model, element.maker]]));
                });
            });

            getColors().then(data => {
                setColors([]);
                data.forEach(element => {
                    setColors(items => ([...items, [element.id, element.color]]));
                });
            });
        }
        return () => mounted = false;
    }, []);
    
    return <div>
        <h2 className="pd-v-2 pd-h-1">Settings</h2>
        <div className="myCard">
            <div className="row">
                <div class="col-3 pd-h-2 pd-v-1 mg-b-3">
                    <h2>Lookup</h2>
                </div>
            </div>
            <div className="row" style={{flexWrap: "nowrap", background: "#f8f8ff", paddingBottom: "14px", overflow: "auto"}}>
            <div class="col-3">
                <LookupCard
                    title="Brands"
                    lookup="Brand"
                    items={brands}></LookupCard>
            </div>
            <div class="col-3">
                <LookupCard
                    title="Transmissions"
                    lookup="Transmission"
                    items={transmissions}></LookupCard>
            </div>
            <div class="col-3">
                <LookupCard
                    title="Categories"
                    lookup="Category"
                    items={categories}></LookupCard>
            </div>
            <div class="col-3">
                <LookupCard
                    title="Engines"
                    lookup="Engine"
                    items={engines}></LookupCard>
            </div>
            <div class="col-3">
                <LookupCard
                    title="Models"
                    title2="Maker"
                    lookup="Model"
                    items={models}
                    with_select={true}
                    itemsSelect={brands}></LookupCard>
            </div>
            <div class="col-3">
                <LookupCard
                    title="Colors"
                    lookup="Color"
                    items={colors}></LookupCard>
            </div>
        </div>
        </div>
        
    </div>
}

export default SettingPage;