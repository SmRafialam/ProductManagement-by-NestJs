import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamService } from './team.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('team')
@Controller()
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get()
    getTeamList() {
        return this.teamService.getTeamList()
    }

    @Post()
    addTeam(@Body() teamDto: CreateTeamDto) {
        return this.teamService.addTeam(teamDto)
    }

    @Get(':id')
    getTeamById(@Param('id') teamId: string) {
        return this.teamService.getTeamById(teamId)
    }

    @Patch(':id')
    updateTeam(@Param('id') teamId: string, @Body() teamDto: UpdateTeamDto) {
        return this.teamService.updateTeam(teamId, teamDto)
    }

    @Delete(':id')
    deleteTeam(@Param('id') teamId: string) {
        return this.teamService.deleteTeam(teamId)
    }
}
