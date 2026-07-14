import TableSession from "../models/TableSession.js";

export const createTableSession = async (req, res, next) => {
    try{
        const {tableNumber, customerName, phoneNumber} = req.body;

        if(!tableNumber){
            const error = new Error("Table number is required");
            error.statusCode = 400;
            return next(error);
        }

        const session = await TableSession.create({
            tableNumber,
            customerName: customerName,
            phoneNumber: phoneNumber
        });

        res.status(201).json({
            success: true,
            data: session
        });
    }catch(error){
        next(error);
    }
};

export const getTableSession = async (req, res, next) => {
    try{
        const session = await TableSession.findOne({sessionId: req.params.sessionId});
        if(!session){
            const error = new Error("Table session not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: session
        });
    }catch(error){
        next(error);
    }
};

export const closeTableSession = async (req, res, next) => {
    try{
        const session = await TableSession.findOneAndUpdate(
            {sessionId: req.params.sessionId},
            {active: false},
            {new: true}
        );
        if(!session){
            const error = new Error("Table session not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: session
        });
    }catch(error){
        next(error);
    }
};
