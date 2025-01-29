const Store = require('../models/Store');

exports.createStore = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Verificar si el usuario ya tiene una tienda
        const existingStore = await Store.findOne({ owner: req.user.id });
        if (existingStore) {
            return res.status(400).json({ msg: 'User already has a store' });
        }

        const store = new Store({
            name,
            description,
            owner: req.user.id,
            status: 'pending'
        });

        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getStores = async (req, res) => {
    try {
        const stores = await Store.find().populate('owner', ['name', 'email']);
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getApprovedStores = async (req, res) => {
    try {
        const stores = await Store.find({ status: 'approved' }).populate('owner', ['name', 'email']);
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPendingStores = async (req, res) => {
    try {
        const stores = await Store.find({ status: 'pending' }).populate('owner', ['name', 'email']);
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.approveStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        store.status = 'approved';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.suspendStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        store.status = 'suspended';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        await store.remove();
        res.json({ msg: 'Store removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.hasStore = async (req, res) => {
    try {
        const store = await Store.findOne({ owner: req.user.id });
        if (store) {
            return res.json({ hasStore: true });
        } else {
            return res.json({ hasStore: false });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};