import express from 'express';
import numbers from './numbers.js';

const app = express();

app.get(['/add', '/add/:a/:b'], numbers, (req, res) => {
    res.send(String(req.num1 + req.num2));
});

app.get(['/subtract', '/subtract/:a/:b'], numbers, (req, res) => {
    res.send(String(req.num1 - req.num2));
});

app.get(['/calculate', '/calculate/:operator/:a/:b'], numbers, (req, res) => {
    const operator = req.query.operator ?? req.params.operator;
    let result;

    switch (operator) {
        case '+': result = req.num1 + req.num2; break;
        case '-': result = req.num1 - req.num2; break;
        case '*': result = req.num1 * req.num2; break;
        case '/':
            if (req.num2 === 0) return res.status(400).send('Cant divide by 0');
            result = req.num1 / req.num2;
            break;
        default: return res.status(400).send('Invalid');
    }

    res.send(String(result));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));