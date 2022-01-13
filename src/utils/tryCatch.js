function tryCatch(func) {
    try {
        func(req, res, next);
    } catch (err) {
        next(err);
    }
}