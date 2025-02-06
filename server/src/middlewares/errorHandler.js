//Centralized error handling

const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({
    status: 500,
    message: "Something went wrong",
    err: err.message,
  });
};

export default errorHandling;
