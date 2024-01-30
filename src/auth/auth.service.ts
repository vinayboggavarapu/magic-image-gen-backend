import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignUpDto) {
    const randomUuid = crypto.randomUUID();
    const randomApiKey = await bcrypt.hash(randomUuid, 10);
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = await this.prisma.user.findFirst({
      where: {
        email: signupDto.email,
      },
    });
    if (user) return { error: 'User already exist' };

    return this.prisma.user.create({
      data: { ...signupDto, password: hashedPassword, api_key: randomApiKey },
      select: {
        id: true,
        api_key: true,
        email: true,
      },
    });
  }

  async getApiKey(signInDto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signInDto.email,
      },
      select: {
        password: true,
        api_key: true,
      },
    });
    if (!user || !user.api_key) return null;
    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (passwordMatch) {
      return user.api_key;
    }
  }
}
