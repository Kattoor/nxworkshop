import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getGame', () => {
    it('should return the correct game', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getGame('purrfection')).toEqual(
        {
          "description": "A cat grooming contest goes horribly wrong.",
          "id": "purrfection",
          "image": "/assets/cat.png",
          "name": "Purrfection",
          "price": 45,
          "rating": expect.any(Number)
        });
    });
  });
});
