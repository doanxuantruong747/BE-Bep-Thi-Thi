/** @format */

/** @format */

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { extname } from 'path';
import axios from 'axios';

export const genRefreshToken = async (n: number) => await bcrypt.genSaltSync(n);
export const genRefreshTokenWithTimestamp = async () => {
  const refreshToken = await genRefreshToken(8);
  const ts = moment().unix();
  return refreshToken + ts.toString();
};

export const hashRefreshToken = async (strRefresh: string) => {
  const ts = strRefresh.slice(-10);
  const RT_without_ts = strRefresh.slice(0, -10);
  const dataToHash = RT_without_ts + ts;
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash);
  const hashedToken = hash.digest('hex');
  return hashedToken;
};

export const compareRefreshToken = async (strRefresh: string, hashToken: string) => {
  return strRefresh === hashToken;
};

export const generateCode = async (length: number) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }
  return randomCode;
};

export const genPassword = async (str: string) => {
  return await bcrypt.hash(str, bcrypt.genSaltSync(8));
};

export const parsePaginate = paramsDto => {
  const limit = Number(paramsDto?.limit) || 10;
  const page = Number(paramsDto?.page) || 1;
  const latitude = Number(paramsDto?.latitude);
  const longitude = Number(paramsDto?.longitude);
  const thresholds = stringToArray(paramsDto?.thresholds);
  const search = String(paramsDto?.search || '');
  const id = paramsDto?.id;

  const offset = Number(paramsDto?.offset) ? Number(paramsDto?.offset) : limit * (page - 1);
  return { ...paramsDto, limit, page, offset, latitude, longitude, thresholds, search, id };
};

export const resJson = ({ data = [], message = '', status = 200 }) => {
  const success = status >= 200 && status < 300 ? true : false;
  return {
    data,
    message,
    status,
    success,
  };
};

export const isQueryParam = async param => {
  if (param && param != undefined && param != '') {
    return true;
  }
  return false;
};

export const stringToArray = (value: string) => {
  let array = [];
  if (value) {
    const arrTmp = value.split(',');
    array = arrTmp?.map(str => {
      return Number(str);
    });
  }
  return array;
};

export const generateFilename = (req, file, cb) => {
  // Generating a 32 random chars long string
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  //Calling the callback passing the random name generated with the original extension name
  cb(null, `${randomName}${extname(file.originalname)}`);
};

export const customAxios = async (
  method: string,
  path: string,
  token?: string,
  data?: any,
  params?: any,
) => {
  const respones = await axios({
    headers: { Authorization: `Bearer ${token}` },
    baseURL: `${process.env.API_POOL_CORE_V1}${path}`,
    method: `${method}`,
    params,
    data,
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error.message);
    });
  console.log(`${process.env.API_POOL_CORE_V1}${path}`);
  console.log('-------respones=-------', respones);
  return respones;
};

export const customAxiosWithFormData = async (
  method: string,
  path: string,
  token: string,
  data: any,
) => {
  const respones = await axios({
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    baseURL: `${process.env.API_POOL_CORE}${path}`,
    method: `${method}`,
    data,
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error.message);
    });
  console.log(`${process.env.API_POOL_CORE}${path}`);
  console.log('-------respones=-------', respones);
  return respones;
};

export const converTimestamp = async (timestamp: number) => {
  const formattedDate = moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');

  // const date = new Date(timestamp * 1000);
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  // const day = String(date.getDate()).padStart(2, '0');
  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');
  // const seconds = String(date.getSeconds()).padStart(2, '0');

  //const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
export function isNumber(str) {
  return /^\d+(\.\d+)?$/.test(str);
}
