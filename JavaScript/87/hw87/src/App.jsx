import { Component } from "react";
import "./App.css";
import Header from "./Header";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";
import AddRecipe from "./AddRecipe";
import { recipesDB } from "./HW83";

export default class App extends Component {
    state = {
        recipes: recipesDB,
        selectedRecipe: 0,
        showAddForm: false
    };

    toggleAddForm = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    };

    addRecipe = (newRecipe) => {
        this.setState({
            recipes: [...this.state.recipes, newRecipe],
            selectedRecipe: this.state.recipes.length
        });
    };

    render() {
        const { recipes, selectedRecipe, showAddForm } = this.state;

        const recipeComponent =
            !recipes.length ? (
                <p>No recipes available</p>
            ) : (
                <Recipe recipe={recipes[selectedRecipe]} />
            );

        return (
            <>
                <Header />
                <button onClick={this.toggleAddForm}>
                    {showAddForm ? "Hide Add Recipe Form" : "Add Recipe"}
                </button>
                {showAddForm && <AddRecipe onAddRecipe={this.addRecipe} />}
                <RecipeList
                    recipes={recipes}
                    selectedRecipe={selectedRecipe}
                    setSelectedRecipe={(i) => this.setState({ selectedRecipe: i })}
                />
                {recipeComponent}
            </>
        );
    }
}