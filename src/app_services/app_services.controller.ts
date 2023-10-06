/** @format */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { generateFilename, parsePaginate } from 'utils';
import { AppServicesService } from './app_services.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DetailParamDto } from 'validation/DetailParam.dto';
@ApiBearerAuth()
@ApiTags('App Services')
@Controller('app-services')
export class AppServicesController {
  constructor(private appServicesService: AppServicesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  getAllServices(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { limit, search, page } = parsePaginate(paramsDto);
    // console.log(req.headers.authorization.split(' ')[1]);
    return this.appServicesService.getAllServices(limit, page, search);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async createAppServices(@UploadedFile() icon, @Body() body: any) {
    console.log('---input body--', body);
    if (icon?.['filename']) {
      body.icon = icon['filename'];
    }
    return this.appServicesService.createAppServices(body);
  }

  //update app services
  @HttpCode(HttpStatus.OK)
  @Post('update')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async updateAppservice(@UploadedFile() icon, @Body() body: any) {
    console.log('icon', icon);
    if (icon?.['filename']) {
      body.icon = icon['filename'];
    }
    return this.appServicesService.updateAppServices(body);
  }

  //delete
  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  async deleteAppServices(@Query() query: any) {
    console.log('query', query);
    return this.appServicesService.deleteAppServices(query.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  singleNews(@Query() paramsDto: DetailParamDto) {
    console.log('paramsDto', paramsDto);
    const { id } = paramsDto;
    try {
      return this.appServicesService.singleAppService({ id });
    } catch (error) {
      console.log('----error get single Events --- ', error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/user')
  listAppClaimAndClaimedByUser(
    @Headers('Authorization') Authorization: string,
    @Query() paramsDto: Record<string, any>,
  ) {
    const params = parsePaginate(paramsDto);
    try {
      return this.appServicesService.listAppClaimAndClaimedByUser(Authorization, params);
    } catch (error) {
      console.log('----error get app claim & claimed --- ', error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/claim')
  claimAppServices(@Headers('Authorization') Authorization: string, @Body() input: any) {
    try {
      return this.appServicesService.claimAppServices(Authorization, input);
    } catch (error) {
      console.log('----error claim app service --- ', error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/earn')
  listEarnByUser(
    @Headers('Authorization') Authorization: string,
    @Query() paramsDto: Record<string, any>,
  ) {
    const params = parsePaginate(paramsDto);
    try {
      return this.appServicesService.listEarnByUser(Authorization, params);
    } catch (error) {
      console.log('----error get earn --- ', error);
    }
  }
}
