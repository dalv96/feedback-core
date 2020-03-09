const Poll = require('../models/Poll');
const Question = require('../models/Question');

const logger = require('./logger');

function createQuestion(question) {
    return new Question(question).save();
}

function createQuestions(questions = []) {
    const promises = [];

    questions.forEach(item => {
        promises.push(createQuestion(item));
    });

    return Promise.all(promises);
}

function validatePoll({ name, questions }) {
    if (!name) return { errorСode: 'name_is_undefined' };
    if (name.length < 5) return { errorСode: 'name_is_short' };
    if (name.length > 100) return { errorСode: 'name_is_too_long' };

    if (!questions) return { errorСode: 'questions_is_undefined' };
    if (questions.length === 0) return { errorСode: 'too_few_questions' };
    if (questions.length > 5) return { errorСode: 'too_many_questions' };

    return false;
}

module.exports = {
    /*
        Ручка получения активного опроса
    */
    getCurrent: async (req, res) => {
        const poll = await Poll.findOne({ active: true }).populate('questions').lean();

        if (!poll) return res.sendStatus(404);

        return res.status(200).send(poll);
    },

    /*
        Ручка получения опроса
    */
    get: async (req, res) => {
        const { _id } = req.params;

        const poll = await Poll.findOne({ _id }).populate('questions').lean();

        if (!poll) return res.sendStatus(404);

        return res.status(200).send(poll);
    },

    /*
        Ручка получения опросов
    */
    getAll: async (req, res) => {
        const poll = await Poll.find().populate('questions').lean();

        return res.status(200).send(poll);
    },

    /*
        Ручка создания опроса
    */
    create: async (req, res) => {
        const { body } = req;
        const { name, author, active } = body;

        const validate = validatePoll(body);
        if (validate) return res.status(400).send(validate);

        const questions = await createQuestions(body.questions);

        if (active) {
            const activePoll = await Poll.findOne({ active: true }).lean();

            if (activePoll) return res.status(400).send({ errorCode: 'active_poll_is_already_exist', poll: activePoll });
        }

        const poll = await new Poll({
            name, questions, author, active,
        }).save();

        logger.log(`Создан опрос "${name}" (${poll._doc._id})`);
        return res.sendStatus(200);
    },

    /*
        Ручка изменения опроса
    */
    edit: async (req, res) => {
        const { body } = req;
        const { _id, name, active } = body;

        const validate = validatePoll(body);
        if (validate) return res.status(400).send(validate);

        let poll = await Poll.findOne({ _id });

        if (!poll) return res.sendStatus(404);

        if (active) {
            const activePoll = await Poll.findOne({ active: true }).lean();

            if (activePoll) return res.status(400).send({ errorCode: 'active_poll_is_already_exist', poll: activePoll });
        }

        // TODO: Только если нет ответов
        for (let index = 0; index < body.questions.length; index++) {
            const question = body.questions[index];

            if (question._id) {
                let q = await Question.findOne({ _id: question._id });

                q = { ...q, ...question };
                body.questions[index] = await q.save();
            } else {
                body.questions[index] = await createQuestion(question);
            }
        }

        // TODO: Оставлять только редактируемые данные
        poll = { ...poll, ...body };

        await poll.save();

        logger.log(`Изменен опрос "${name}" (${poll._doc._id})`);
        return res.sendStatus(200);
    },
};
