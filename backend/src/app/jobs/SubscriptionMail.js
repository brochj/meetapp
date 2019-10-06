import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail'; // return a unique key
  }

  // handle é tarefa a ser executada para cada email
  async handle({ data }) {
    const { user, meetup } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Nova inscrição em ${meetup.title}`,
      template: 'subscription',
      context: {
        meetupCreator: meetup.User.name,
        meetup_title: meetup.title,
        user: user.name,
        date: format(
          parseISO(meetup.date),
          "dd 'de' MMMM' de ' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
