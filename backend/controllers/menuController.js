import MenuItem from "../models/MenuItem.js";

export const getMenuItems = async (req, res, next) => {
    try{
        const {category} = req.query;
        const filter = {available: true};
        if (category) {
            filter.category = category;
        }

        const items = await MenuItem.find(filter).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    }catch(error){
        next(error);
    }
};

export const getMenuItemById = async (req, res, next) => {
    try{
        const item = await MenuItem.findById(req.params.id);
        if(!item){
            const error = new Error("Menu item not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: item
        });
    }catch(error){
        next(error);
    }
};

export const createMenuItem = async (req, res, next) => {
    try{
        const item = await MenuItem.create(req.body);
        res.status(201).json({
            success: true,
            data: item
        });
    }catch(error){
        next(error);
    }
};

export const updateMenuItem = async (req, res, next) => {
    try{
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!item){
            const error = new Error("Menu item not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: item
        });
    }catch(error){
        next(error);
    }
};

export const deleteMenuItem = async (req, res, next) => {
    try{
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if(!item){
            const error = new Error("Menu item not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: item
        });
    }catch(error){
        next(error);
    }
};
