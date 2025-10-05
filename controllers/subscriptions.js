import subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const sub = await subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json(sub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
    next();
}

export const getSubscriptions = async (req, res) => {
    try {
        const subs = await subscription.find({user: req.user._id}); 
        res.status(200).json(subs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
