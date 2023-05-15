import kleur from 'kleur';
import moment from 'moment';

const isDebug = process.env.IS_DEBUG || true;

const debug = (loc: string, msg: string) => {
  const time = moment().format('DD-MMM-YYYY HH:mm:ss');
  if (isDebug) {
    // eslint-disable-next-line no-console
    console.log(`${kleur.red(`[${time}]:`)} [${loc}] ${msg} `);
  }
};
export default debug;
