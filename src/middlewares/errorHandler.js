module.exports = (err, req, res, next) => {
  if(err.code)
    res.status(err.code)
  else
    res.status(500);

  res.json({
    status: err.code || 500,
    message: err.message || "Unknown error",
    stack: JSON.stringify(err.stack)

  });
}