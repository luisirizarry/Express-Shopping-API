const ExpressError = require("./expressError");

function checkItem(req, res, next) {
    try {
        const { name, price } = req.body;

        if (!name || typeof name !== "string") {
            throw new ExpressError("Invalid or missing 'name'. It must be a non-empty string.", 400);
        }

        if (price === undefined || isNaN(price) || Number(price) < 0) {
            throw new ExpressError("Invalid or missing 'price'. It must be a non-negative number.", 400);
        }

        next(); 
    } catch (e) {
        return next(e); 
    }
}

module.exports = { checkItem };
