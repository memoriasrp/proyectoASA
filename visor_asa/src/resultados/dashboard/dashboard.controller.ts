import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { DashboardResumenDto } from './dto/dashboard-resumen.dto';

@Controller('resultados/dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  @Get('resumen')
  async obtenerResumen(): Promise<DashboardResumenDto> {
    return await this.dashboardService.getResumenDashboard();
  }
}
