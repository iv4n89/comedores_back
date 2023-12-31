import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CommKitchenModule } from './comm_place/comm_place.module';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/db.sqlite',
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule.forRoot({
      load: [() => ({
        port: parseInt(process.env.PORT, 10) || 3000,
      })],
    }),
    UserModule,
    CountryModule,
    CommKitchenModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
