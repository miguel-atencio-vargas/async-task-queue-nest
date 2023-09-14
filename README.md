# Handling Asynchronous Tasks with Queues in Nest.js and Docker

This repository demonstrates how to handle asynchronous tasks with queues using Nest.js and Docker. It provides a basic setup for building scalable and efficient applications that can offload time-consuming tasks to a background queue.


## Tools and Libraries Used:
- Nest.js (Node.js framework)
- BullMQ (Queue Library)
- Redis (Queue Storage)
- Docker
- Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (if not using Docker for development)
- [Nest CLI](https://docs.nestjs.com/first-steps)


## Getting Started

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Copy and set up your env variables on env file can be env.dev or env.prod
   
3. Build the project
   ```shell
   npm run dev:build
   ```
4. Start up the project
   ```shell
   npm run dev:up
   ```
### Tip:
If you want to start all and only watch logs from Nest only copy this command:
```shell
npm run dev:build && \
npm run dev:up:detached && \
export DOCKER_NAME=main && \
docker logs -f $DOCKER_NAME
```
## Disclaimers
This recipe assumes you have a basic understanding of Nest.js and Docker. If you're new to these technologies, consider familiarizing yourself with them before proceeding.

## Objective
The goal of this side project is to create a Nest.js application that uses BullMQ to manage asynchronous tasks within a Docker container. To illustrate this asynchronous task we will implement a Telegram Bot Notification. Docker Compose will be used to manage the Redis container for the queue storage and the Nest.js application container.


## Steps to implement async queue tasks on your nest project
1. Set Up a Nest.js Project
Create a new Nest.js project or use an existing one.
```shell
npm install -g @nestjs/cli 
nest new async-task-queue-nest 
cd async-task-queue-nest
```
2. Install Dependencies
Install BullMQ and other required dependencies for your Nest.js project.

```shell
npm i -S bullmq @nestjs/bullmq telegraf ioredis
```

3. Create a Queue Module
In your Nest.js application, create a BullMQ queue module. Define your queue's name and options as needed.

```ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { IConfig } from './config/config.interface';

@Module({
 imports: [
   BullModule.forRootAsync({
     useFactory: (configService: ConfigService<IConfig, true>) => ({
       connection: {
         host: configService.get('redis.host', { infer: true }),
         port: configService.get('redis.port', { infer: true }),
       },
     }),
     inject: [ConfigService],
   }),
 ],
 exports: [BullMQModule],
})

export class BullMQModule {}
```

4. Create a Task Service
Create a service to define and enqueue your tasks.

```ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { NotificationServiceMessage } from './notifications.interface';
import {
 NOTIFICATIONS_JOB_NAME,
 NOTIFICATIONS_QUEUE_NAME,
} from './notifications.constants';

@Injectable()
export class NotificationsService {
 constructor(
   @InjectQueue(NOTIFICATIONS_QUEUE_NAME)
   private readonly notificationQueue: Queue,
 ) {}

 async sendMessage(message: NotificationServiceMessage): Promise<void> {
   await this.notificationQueue.add(NOTIFICATIONS_JOB_NAME, message);
 }
}

ta; } }
Step 5: Create a Worker Service
Create a processor job from the queue.
import { NotImplementedException } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import {
 NotificationType,
 NotificationServiceMessage,
} from './notifications.interface';
import { TelegramChannel } from './channels/telegram.channel';
import { NOTIFICATIONS_QUEUE_NAME } from './notifications.constants';

@Processor(NOTIFICATIONS_QUEUE_NAME)
export class NotificationsProcessor extends WorkerHost {
 constructor(private readonly telegramChannel: TelegramChannel) {
   super();
 }

 async process(job: Job<NotificationServiceMessage>): Promise<void> {
   const { data } = job;

   if (data.type === NotificationType.TELEGRAM) {
     this.telegramChannel.processMessage(data);
   } else {
     throw new NotImplementedException();
   }
 }
}
```

This is the core components that needs to start using Asynchronous Tasks with Queues in your project from here you check all the rest in the repository.

## Conclusion
By following this recipe, you've created a Nest.js application that handles asynchronous tasks using BullMQ, containerized it with Docker, and orchestrated containers with Docker Compose. This setup enables you to efficiently manage background tasks in a scalable and containerized environment.
