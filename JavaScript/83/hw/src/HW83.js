import './style.css';
import dayjs from 'dayjs';
import { getIngredients, kitchenTools, cook } from './HW83.js';

const output = document.getElementById('recipe-output');

output.innerHTML = `
  <p>Ingredients for pasta: ${getIngredients('pasta').join(', ')}</p>
  <p>Tools needed: ${kitchenTools.join(', ')}</p>
  <p>${cook('pasta')}</p>
  <p>Current time: ${dayjs().format('dddd, MMMM D, YYYY h:mm:ss A')}</p>
`;

console.log('dayjs test:', dayjs().format('YYYY-MM-DD HH:mm:ss'));