import { Test, TestingModule } from '@nestjs/testing';
import { SociosController } from './socios.controller';

describe('SociosController', () => {
  let controller: SociosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SociosController],
    }).compile();

    controller = module.get<SociosController>(SociosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
