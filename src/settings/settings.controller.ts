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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, parsePaginate } from 'utils/libs';
import { SettingsService } from './settings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  // create a Event
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
  async create(@UploadedFile() icon, @Body() body: any) {
    console.log('[file--]', icon, body);
    if (icon?.['filename']) {
      body.icon = icon['filename'];
    }
    return this.settingsService.create(body);
  }

  // get all Setting
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page } = parsePaginate(paramsDto);
    try {
      return this.settingsService.findAll({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all  --- ', error);
    }
  }

  // get all Setting About Us
  @HttpCode(HttpStatus.OK)
  @Get('about')
  findAboutUs(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page } = parsePaginate(paramsDto);
    try {
      return this.settingsService.findAboutUs({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all Even --- ', error);
    }
  }

  // get all Setting PolicyPasscode
  @HttpCode(HttpStatus.OK)
  @Get('policy_passcode')
  findPolicyPasscode(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page } = parsePaginate(paramsDto);
    try {
      return this.settingsService.findPolicyPasscode({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all Even --- ', error);
    }
  }

  // get all Setting PolicyPasscode
  @HttpCode(HttpStatus.OK)
  @Get('conditions')
  findConditions(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page } = parsePaginate(paramsDto);
    try {
      return this.settingsService.findConditions({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all Even --- ', error);
    }
  }

  // Update a Event
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
  async updateEvent(@UploadedFile() icon, @Body() body: any) {
    console.log('[file--]', icon, body);
    if (icon?.['filename']) {
      body.icon = icon['filename'];
    }
    return this.settingsService.updateSetting(body);
  }

  // Remove a setting
  @HttpCode(HttpStatus.OK)
  @Delete('')
  remove(@Query() paramsDto: Record<string, any>) {
    console.log('----------paramsDto----------', paramsDto);
    const { id } = parsePaginate(paramsDto);
    try {
      return this.settingsService.remove({ id });
    } catch (error) {
      console.log('-----error remove-----', error);
    }
  }
}
