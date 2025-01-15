import { intervalToDuration } from 'date-fns';
import CryptoJs from 'crypto-js';

function toRupiah(amount: number): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
}

const toNumber = (input: string): number =>
  Number(input.replace(/[^0-9]+/g, ''));

function toUrl(input: string): string {
  let result = '';
  const urlStarters = ['https://', 'http://', '/', 'blob'];

  if (urlStarters.every((item) => !input.startsWith(item))) {
    result = `/${input}`;
  } else {
    result = input;
  }

  return encodeURI(result);
}

const toSentenceCase = (input: string): string =>
  (input[0]?.toUpperCase() ?? '') + input.slice(1, input.length);

const toTitleCase = (input: string): string =>
  input.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

function toDuration(input: number | string) {
  const interval = intervalToDuration({
    start: 0,
    end: Number(input) * 1000,
  });
  const hoursRaw = (interval.days ?? 0) * 24 + (interval.hours ?? 0);
  const hours = (hoursRaw ?? 0) < 10 ? `0${hoursRaw}` : hoursRaw;
  const minutes =
    (interval.minutes ?? 0) < 10
      ? `0${interval.minutes ?? 0}`
      : interval.minutes;
  const seconds =
    (interval.seconds ?? 0) < 10
      ? `0${interval.seconds ?? 0}`
      : interval.seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function encrypt(data: string) {
  const key = CryptoJs.enc.Utf8.parse(process.env.NEXT_PUBLIC_AES_KEY || '');
  const iv = CryptoJs.enc.Utf8.parse(process.env.NEXT_PUBLIC_AES_IV || '');
  const enc = CryptoJs.AES.encrypt(data, key, {
    iv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
  });

  return enc.ciphertext.toString(CryptoJs.enc.Base64);
}

export {
  toNumber,
  toRupiah,
  toUrl,
  toSentenceCase,
  toTitleCase,
  toDuration,
  encrypt,
};
