import './style.css';
import dayjs from 'dayjs';
import { getIngredients, kitchenTools, cook } from './HW83.js';

document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('recipe-output');

  output.innerHTML = '';

  const pastaIngredients = document.createElement('p');
  pastaIngredients.textContent = `Ingredients for pasta: ${getIngredients('pasta').join(', ')}`;

  const pastaTools = document.createElement('p');
  pastaTools.textContent = `Tools needed: ${kitchenTools.join(', ')}`;

  const pastaCook = document.createElement('p');
  pastaCook.textContent = cook('pasta');

  const saladIngredients = document.createElement('p');
  saladIngredients.textContent = `Ingredients for salad: ${getIngredients('salad').join(', ')}`;

  const saladCook = document.createElement('p');
  saladCook.textContent = cook('salad');

  const currentTime = document.createElement('p');
  currentTime.textContent = `Current time: ${dayjs().format('dddd, MMMM D, YYYY h:mm:ss A')}`;

  output.appendChild(pastaIngredients);
  output.appendChild(pastaTools);
  output.appendChild(pastaCook);
  output.appendChild(saladIngredients);
  output.appendChild(saladCook);
  output.appendChild(currentTime);

  console.log('dayjs test:', dayjs().format('YYYY-MM-DD HH:mm:ss'));
});