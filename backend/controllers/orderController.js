import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

export const placeOrder = async (req, res, next) => {
    try{
        const {tableNumber, sessionId, items} = req.body;
        if(!tableNumber){
            const error = new Error("Table number is required");
            error.statusCode = 400;
            return next(error);
        }
        if(!sessionId){
            const error = new Error("Session ID is required");
            error.statusCode = 400;
            return next(error);
        }
        if(!items || items.length === 0){
            const error = new Error("Order must contain at least one item");
            error.statusCode = 400;
            return next(error);
        }

        let totalAmount = 0;
        const orderItems = [];
        for(const cartItem of items){
            const menuItem = await MenuItem.findById(cartItem.menuItemId);

            if(!menuItem){
                const error = new Error(`Menu item with ID ${cartItem.menuItemId} not found`);
                error.statusCode = 404;
                return next(error);
            }

            if(!menuItem.available){
                const error = new Error(`Menu item ${menuItem.name} is not available`);
                error.statusCode = 400;
                return next(error);
            }

            const quantity = cartItem.quantity || 1;
            const itemTotal = menuItem.price * quantity;
            totalAmount += itemTotal;
            orderItems.push({
                menuItem: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity
            });
        }

        const order = await Order.create({
            tableNumber,
            sessionId,
            items: orderItems,
            totalAmount,
            status: "Pending"
        });

        res.status(201).json({
            success: true,
            data: order
        });
    }catch(error){
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);

        if(!order){
            const error = new Error("Order not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: order
        });
    }catch(error){
        next(error);
    }
};

export const getOrdersByTable = async (req, res, next) => {
    try{
        const orders = await Order.find({tableNumber: req.params.tableNumber}).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    }catch(error){
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try{
        const {status} = req.query;
        const filter = status ? {status} : {};
        const orders = await Order.find(filter).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    }catch(error){
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try{
        const {status} = req.body;

        const validStatuses = ["Pending", "Preparing", "Served", "Cancelled"];
        if(!validStatuses.includes(status)){
            const error = new Error(`Invalid status. Valid statuses are: ${validStatuses.join(", ")}`);
            error.statusCode = 400;
            return next(error);
        }

        const order = await Order.findById(req.params.id);
        if(!order){
            const error = new Error("Order not found");
            error.statusCode = 404;
            return next(error);
        }

        const validTransitions = {
            "Pending": ["Preparing", "Cancelled"],
            "Preparing": ["Served", "Cancelled"],
            "Served": [],
            "Cancelled": []
        };

        if(!validTransitions[order.status].includes(status)){
            const error = new Error(`Invalid status transition from ${order.status} to ${status}`);
            error.statusCode = 400;
            return next(error);
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });
    }catch(error){
        next(error);
    }
};
