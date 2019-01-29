'use strict'

const Feedback = require('../models/Feedback');
const logger = require('./logger');

const xl = require('excel4node');


const hash1 = {
  '0': 'Удовлетворительно',
  '-1': 'Плохо',
  '1': 'Хорошо'
};

const hash2 = {
  '0': 'Пришлось обращаться снова',
  '1': 'Да',
};

module.exports = {

  get: async (req, res, next) => {
    var feedback = await Feedback.find().lean();
    res.locals.data = {
      feedback: feedback
    };
    next();
  },

  getExcel: async (req, res, next) => {
    var feedback = await Feedback.find().lean();

    const dateS = new Date(req.query.dateStart)
    const dateE = new Date(req.query.dateEnd || '2025-12-10')

    feedback = feedback.filter((i) => {
      const d = new Date(i.date)

      return (dateS < d) && (dateE > d)
    })

    var wb = new xl.Workbook({
      dateFormat: 'dd/mm/yyyy'
    });

    var ws = wb.addWorksheet('Таблица 1');

    let counter = 2;

    ws.column(1).setWidth(40);
    ws.column(3).setWidth(25);

    ws.column(5).setWidth(17);

    ws.column(7).setWidth(25);
    ws.column(8).setWidth(25);
    ws.column(9).setWidth(25);

    var myStyle = wb.createStyle({
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
    });

    var style = wb.createStyle({
      font: {
          color: '#000000',
          size: 11,
          bold: true
      },
      alignment: {
           wrapText: true,
           horizontal: 'center'
      }
  });

    ws.cell(1, 1).string('Ф.И.О.').style(style);
    ws.cell(1, 2).string('Дата отзыва').style(style);
    ws.cell(1, 3).string('Отдел').style(style);
    ws.cell(1, 4).string('1 вопрос').style(style);
    ws.cell(1, 5).string('2 вопрос').style(style);
    ws.cell(1, 6).string('3 вопрос').style(style);
    ws.cell(1, 7, 1, 9, true).number(1).string('Комментарии').style(style);

    feedback.forEach( (item, i) => {
      if (item.author && item.author.trim()) {
        ws.cell(counter, 1).string(item.author);
        ws.cell(counter, 2).date(item.date).style(myStyle);;
        ws.cell(counter, 3).string(item.department);

        const q1 = hash1[item.q1+''];
        const q2 = hash2[item.q2+''];

        ws.cell(counter, 4).string(q1).style(myStyle);;
        ws.cell(counter, 5).string(q2).style(myStyle);
        ws.cell(counter, 6).number(item.q3).style(myStyle);;

        if (item.text1)
          ws.cell(counter, 7).string(item.text1).style(myStyle);

        if (item.text2)
          ws.cell(counter, 8).string(item.text2).style(myStyle);

        if (item.text3)
          ws.cell(counter, 9).string(item.text3).style(myStyle);
      
        counter++;
      }
    })

    wb.write('Export-Feedback.xlsx', res);
  },

  create: async (req, res) => {
    var body = req.body;

    var feedback = new Feedback({
      author: body.author,
      department: body.department,
      date: new Date(),
      q1: body.q1,
      q2: body.q2,
      q3: body.q3,
      text1: body.text1,
      text2: body.text2,
      text3: body.text3
    });
    
    feedback = await feedback.save();
    logger.log(`Добавлен отзыв о ${body.author}`);
    return
  },

  delete: async (req, res) => {
    var fb = await Feedback.findOne({_id: req.params._id}).populate('user');
    var feedback = await Feedback.deleteOne({_id: req.params._id});
    if(feedback.n == "1")
      logger.log(`Удален отзыв о ${fb.user.login}`);

    res.json(feedback);
  }

};
