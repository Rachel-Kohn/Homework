export default (req, res, next) => {
    const a = req.query.a ?? req.params.a;
    const b = req.query.b ?? req.params.b;

    req.num1 = Number(a);
    req.num2 = Number(b);

    if (isNaN(req.num1) || isNaN(req.num2)) {
        return res.status(400).send('Invalid number');
    }

    next();
};