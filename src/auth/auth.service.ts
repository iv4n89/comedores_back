import { Injectable } from '@nestjs/common';
import { CommunityPersonService } from 'src/comm_place/comm_person.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly commPersonService: CommunityPersonService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.commPersonService.login(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    return {
      user,
    }
  }
}
