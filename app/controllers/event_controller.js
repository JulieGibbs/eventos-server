const db = require('../models');
const Event = db.event;

exports.eventAdd = async (req, res) => {
    console.log('------------------add')

    try {
        const currentTime = new Date()
        const event = new Event({
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            date: currentTime,
            price:req.body.price,
            manager: req.userId
        });

        const savedEvent = await event.save();

        res.status(200).send("Successfully Added")
    }
    catch (err) {
        res.status(500).send({ message: err });
    }
}

exports.eventAll = async (req, res) => {
    console.log('------------------getall')
    try {
        const eventAll = await Event.find();
        res.status(200).json(eventAll)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.eventUpdate = async (req, res) => {
    console.log('------------------update');

    try {
        const eventId = req.params.id;
        const updateOps = req.body;

        console.log('updateOps', updateOps);

        const updatedEvent = await Event.findByIdAndUpdate(eventId, { $set: updateOps }, { new: true });

        if (!updatedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).send("Event updated successfully");
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

exports.eventDelete = async (req, res) => {
    console.log('------------------delete');

    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).send("Event deleted successfully");
    } catch (err) {
        res.status(500).send({ message: err });
    }
}