import { useState } from "react";

export default function AddRecipe({ onAddRecipe }) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
    const [instructions, setInstructions] = useState("");

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, { name: "", amount: "" }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRecipe({ name, ingredients, instructions });
        setName("");
        setIngredients([{ name: "", amount: "" }]);
        setInstructions("");
    };

    return (
        <form className="add-recipe-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Recipe Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            {ingredients.map((ing, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                    <input
                        type="text"
                        placeholder="Ingredient"
                        value={ing.name}
                        onChange={(e) =>
                            handleIngredientChange(index, "name", e.target.value)
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={ing.amount}
                        onChange={(e) =>
                            handleIngredientChange(index, "amount", e.target.value)
                        }
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addIngredientField}>Add Ingredient</button>
            <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
            />
            <button type="submit">Add Recipe</button>
        </form>
    );
}