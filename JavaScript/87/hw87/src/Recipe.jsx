import { Component } from "react";
import ListComponent from "./ListComponent";

export default class Recipe extends Component {
    render() {
        const { name, picture, ingredients, instructions } = this.props.recipe ?? {};

        return (
            <div className="recipe-card" style={{ margin: "20px auto", maxWidth: "400px" }}>
                <h2>{name}</h2>
                {picture && <img src={picture} alt={name} style={{ maxWidth: "100%", borderRadius: "8px" }} />}
                <ListComponent
                    name="Ingredients"
                    items={ingredients.map(i => `${i.amount} ${i.name}`)}
                />
                <ListComponent name="Instructions" items={[instructions]} />
            </div>
        );
    }
}