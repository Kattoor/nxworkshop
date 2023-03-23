import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getGame', () => {
    it('should return the correct game', () => {
      expect(service.getGame('purrfection')).toEqual(
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
