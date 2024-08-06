//handling runtime errors
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    switch(statusCode)
    {
        case 400:
            res.json({title:"Validation error",
                    message:err.message,
                    stackTrace:err.stack
            });
            break;

        case 401:
            res.json({title:"unauthorized access",
                    message:err.message,
                    stackTrace:err.stack
            });
            break;

        case 403:
            res.json({"title":"Forbidden Error",
                    message:err.message,
                    stackTrace:err.stack
            });
            break;

        case 404:
            res.json({"title":"Not Found error",
                    message:err.message,
                    stackTrace:err.stack
            });
            break;

        case 500:
            res.json({"title":"Server Error",
                    message:err.message,
                    stackTrace:err.stack
            });
            break;

        default:
            res.json({"title":"Unexpected error",
                message:err.message,
                stackTrace:err.stack
            });
            break;
    }
}
module.exports=errorHandler;