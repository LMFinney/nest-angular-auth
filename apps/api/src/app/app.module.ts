import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StatesResolver } from './states/states.resolver';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => {
        console.log('is undefined', req === undefined);
        return { req };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, StatesResolver],
})
export class AppModule {}
