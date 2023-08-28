import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class PingService {
  private readonly apiURL = process.env.DATABASE_URL;
  
  @Cron(CronExpression.EVERY_5_MINUTES) // Altere a expressão de acordo com a frequência desejada
  async pingAPI() {
    try {
      await axios.get(this.apiURL);
      console.log('Ping realizado com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer ping:', error.message);
    }
  }
}
