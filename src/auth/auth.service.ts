import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignUpDto) {
    const randomUuid = crypto.randomUUID();
    const randomApiKey = await bcrypt.hash(randomUuid, 10);
    return this.prisma.user.create({
      data: { ...signupDto, api_key: randomApiKey },
    });
  }
}
