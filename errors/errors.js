
// 401
class UnauthorizedError extends Error { }

// 403
class ForbiddenError extends Error { }

// 400
class BadRequestError extends Error { }

const HandleError = (err, res) => {

    if (err instanceof UnauthorizedError)
        res.status(401);
    else if (err instanceof ForbiddenError)
        res.status(403);
    else if (err instanceof BadRequestError)
        res.status(400);
    else
        res.status(500);

    res.send({ message: err.message })
}

module.exports = {
    HandleError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError,
}