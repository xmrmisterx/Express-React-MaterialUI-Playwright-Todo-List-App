//Centralized error handling
const errorHandling = (err,req,res) => {
    console.log(err.stack);
    res.status(500).json({
        status:500,
        message:"Something went wrong",
        error:err
    })
}

export default errorHandling;