/** @format */

import { Injectable } from '@nestjs/common';
import { IUserResponse } from 'types';
import { customAxios, resJson } from 'utils';

@Injectable()
export class AppServicesService {
  async getAllServices(limit, page, search) {
    const token = '';
    const path = `/app-services/all?limit=${limit}&page=${page}&search=${search}`;
    const method = 'GET';
    const body = '';
    const response = await customAxios(method, path, token, body);
    console.log('response', response);
    const { data } = response;
    const { count, rows } = data[0];
    const totalPage = Math.ceil(count / limit);
    return resJson({
      message: 'success',
      data: [{ items: rows }, { totalItem: count, page, totalPage }],
    });
  }

  // create AppServices
  async createAppServices(body: any) {
    const token = '';
    const path = `/app-services/create`;
    const method = 'POST';
    const response = await customAxios(method, path, token, body);
    console.log('-----Create App_service ------', response);

    if (response && response?.success === true) {
      return resJson({
        message: 'Create app_services successfully!',
      });
    }
  }

  // single AppService
  async singleAppService({ id }): Promise<IUserResponse | any> {
    const token = '';
    const path = `/app-services?id=${id}`;
    const method = 'GET';
    const body = '';
    const appService = await customAxios(method, path, token, body);
    if (!appService) {
      return resJson({ status: 401, message: 'App service is not exsit' });
    }
    return resJson({
      message: 'success',
      data: [{ appService }],
    });
  }

  // update AppServices
  async updateAppServices(body: any) {
    const token = '';
    const path = `/app-services/update`;
    const method = 'POST';
    const response = await customAxios(method, path, token, body);
    console.log('----response update AppServices ----', response);
    if (response && response?.success) {
      return resJson({
        message: 'Update app_services successfully!',
      });
    }
  }

  // update delete AppServices
  async deleteAppServices(id: any) {
    const body = '';
    const token = '';
    const path = `/app-services/delete?id=${id}`;
    const method = 'DELETE';
    const response = await customAxios(method, path, token, body);

    return response;
  }

  //get list claim & claimed App by user
  async listAppClaimAndClaimedByUser(access_token: string, paramsDto: any) {
    const token = access_token.split('Bearer ');
    const data = {};
    const path = '/app-services/user?';
    const method = 'GET';
    const response = await customAxios(method, path, token[1], data, paramsDto);
    console.log('-------Request Get list claim & claimed by user--------', response);

    if (response && response?.success === true) {
      return resJson({
        data: [response.data[0], response.data[1]],
      });
    }
    return resJson({ message: 'get list failed ', status: 401 });
  }

  // claim by user
  async claimAppServices(access_token: string, input: any) {
    const { app_service_id, point } = input;
    const token = access_token.split('Bearer ');
    const data = {
      app_service_id,
      point,
    };
    const path = '/user-app-services/create';
    const method = 'POST';
    const response = await customAxios(method, path, token[1], data);
    console.log('-------Request Get list claim & claimed by user--------', response);

    if (response && response?.success === true) {
      return resJson({
        message: 'Claimed Successfully',
      });
    }
    return resJson({ message: 'get list failed ', status: 401 });
  }

  //get list Earn by user
  async listEarnByUser(access_token: string, paramsDto: any) {
    const token = access_token.split('Bearer ');
    const data = {};
    const path = '/user-app-services/earn?';
    const method = 'GET';
    const response = await customAxios(method, path, token[1], data, paramsDto);
    console.log('-------Request Get list Earn by user--------', response);

    if (response && response?.success) {
      return resJson({
        data: [response.data[0], response.data[1]],
        message: ' Successfully',
      });
    }
    return resJson({ message: 'get list Earn failed ', status: 401 });
  }
}
