var express = require('express');
var router = express.Router();
const uuid = require('uuid');

let reminders = [
    { _id: uuid.v4(), title: 'Mobile Platform Development', due: new Date(), duration: 2, type: 'Lecture', room: 'M206' },
    { _id: uuid.v4(), title: 'Cloud Platform Development', due: new Date(), duration: 2, type: 'Lecture', room: 'M209' },
    { _id: uuid.v4(), title: 'Mobile Platform Development', due: new Date(), duration: 1, type: 'Tutorial', room: 'M607' },
];

function findReminder(id) {
    for (const key in reminders) {
        if (reminders[key]._id === id) {
            return reminders[key];
        }
    }
    return null;
}

/* GET reminders list. */
router.get('/', (req, res, next) => {
    res.json(reminders);
});

router.get('/:id', (req, res, next) => {
    const reminder = findReminder(req.params.id);
    if (reminder == null) {
        res.sendStatus(404);
    } else {
        res.json(reminder);
    }
});

router.post('/', (req, res, next) => {
    const reminder = req.body;
    reminder._id = uuid.v4();
    reminders.push(reminder);
    res.sendStatus(200);
});

router.put('/:id', (req, res, next) => {
    const reminder = findReminder(req.params.id);
    reminder.title = req.body.title;
    res.json(reminder);
});

router.delete('/:id', (req, res, next) => {
    const reminder = findReminder(req.params.id);
    if (reminder == null) {
        res.sendStatus(404);
    } else {
        reminders = reminders.filter(r => r._id !== reminder._id);
        res.sendStatus(200);
    }
});

module.exports = router;
