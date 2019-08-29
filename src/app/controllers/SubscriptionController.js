import { Op } from 'sequelize';
import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });
    const user = await User.findByPk(req.userId);
    // TODO verificar se o meetup existe

    // Checks if the logged user is the meetup creator
    if (user.id === meetup.user_id) {
      return res.status(401).json({
        error: "Can't subscribe to you own meetups",
      });
    }

    // Checks if the meeting has happened
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to a meeting that happened." });
    }

    // Checks is the logged user is trying to subscribe to two meetups at the same time.
    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, { meetup, user });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
