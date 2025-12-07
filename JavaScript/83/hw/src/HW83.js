export function getIngredients(recipe) {
    if (recipe === 'pasta') return ['noodles', 'tomato sauce', 'cheese'];
    if (recipe === 'salad') return ['lettuce', 'tomato', 'cucumber'];
    return [];
}

export const kitchenTools = ['pan', 'knife', 'spoon'];

export function cook(recipe) {
    return `Cooking ${recipe} with ${getIngredients(recipe).join(', ')}`;
}
