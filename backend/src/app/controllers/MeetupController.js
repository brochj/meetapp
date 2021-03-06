import { isBefore, parseISO, endOfDay, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const page = req.query.page || 1;

    const searchDate = parseISO(req.query.date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'avatar_id'],
        },
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit: 15,
      offset: 15 * page - 15,
      order: [['date', 'DESC']],
    });

    return res.json(meetups);
  }

  async update(req, res) {
    // data validation
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date: Yup.date(),
      location: Yup.string(),
      file_id: Yup.number(),
    });

    schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const meetup = await Meetup.findByPk(req.params.id);

    // Checks if the logged user is the meetup creator
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You do not have permission to change this meetup.' });
    }

    // Checks if the date has passed
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid.' });
    }

    // Checks if the meeting has happened
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "Can't change a meeting that happened." });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async store(req, res) {
    // data validation
    const schema = Yup.object().shape({
      title: Yup.string().required("'title' field is required (type: string)"),
      description: Yup.string().required(
        "'description' field is required (type: string)"
      ),
      date: Yup.date().required("'date' field is required (type: date)"),
      location: Yup.string().required(
        "'location' field is required (type: string)"
      ),
      file_id: Yup.number().required(
        "'file_id' field is required (type: number)"
      ),
    });

    schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    //  Checks if the date has passed
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const user_id = req.userId;
    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    // Checks if the logged user is the meetup creator
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    // Checks if the meeting has happened
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "Can't delete a meeting that happened." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
