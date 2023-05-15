import moment from 'moment';
import kleur from 'kleur';

const log = (msg: string) => {
  const time = moment().format('DD-MMM-YYY HH:mm:ss');
  console.log(`${kleur.blue(`[${time}]:`)} ${msg}`);
};

export default log;
