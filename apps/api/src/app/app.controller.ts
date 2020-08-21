import { Message } from '@nest-angular-auth/api-interfaces';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './auth/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LoginGuard)
  @Post('auth/login')
  login(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('auth/logout')
  logout(@Request() req: any) {
    req.logOut();
    req.session.passport.user = '';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('auth/user')
  user(@Request() req: any) {
    return req.user;
  }

  @Get('hello')
  @UseGuards(AuthenticatedGuard)
  getData(): Message {
    return this.appService.getData();
  }
}
