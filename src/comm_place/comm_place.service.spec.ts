import { Test, TestingModule } from '@nestjs/testing';
import { CommPlaceService } from './comm_place.service';

describe('CommKitchenService', () => {
  let service: CommPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommPlaceService],
    }).compile();

    service = module.get<CommPlaceService>(CommPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
