export default function RecipeList({ recipes, selectedRecipe, setSelectedRecipe }) {
    return (
        <div style={{ margin: "20px 0" }}>
            {recipes.map((r, index) => (
                <button
                    key={index}
                    style={{
                        margin: "5px",
                        backgroundColor: selectedRecipe === index ? "#3498db" : "#eee",
                        color: selectedRecipe === index ? "white" : "black",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                    onClick={() => setSelectedRecipe(index)}
                >
                    {r.name}
                </button>
            ))}
        </div>
    );
}