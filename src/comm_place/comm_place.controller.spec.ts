import { Test, TestingModule } from '@nestjs/testing';
import { CommPlaceController } from './comm_place.controller';
import { CommPlaceService } from './comm_place.service';

describe('CommKitchenController', () => {
  let controller: CommPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommPlaceController],
      providers: [CommPlaceService],
    }).compile();

    controller = module.get<CommPlaceController>(CommPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
