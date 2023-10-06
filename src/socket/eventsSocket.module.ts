/** @format */

import { Module } from '@nestjs/common';
import { EventsGateway } from './eventsSocket.gateway';

@Module({
  providers: [EventsGateway],
})
export class EventsSocketModule {}
