import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
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
}

export default new MeetupController();
