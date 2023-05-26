import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    getTeamList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Team[];
    }>;
    addTeam(teamDto: CreateTeamDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Team[];
    }>;
    getTeamById(teamId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Team[];
    }>;
    updateTeam(teamId: string, teamDto: UpdateTeamDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Team[];
    }>;
    deleteTeam(teamId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
