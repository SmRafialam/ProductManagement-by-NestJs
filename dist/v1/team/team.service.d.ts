import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from '../user/interface';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { Team } from './interface';
export declare class TeamService {
    private teamModel;
    private userModel;
    private readonly commonService;
    constructor(teamModel: Model<Team>, userModel: Model<User>, commonService: CommonService);
    getTeamList(): Promise<{
        isSuccess: boolean;
        result: Team[];
    }>;
    addTeam(teamData: CreateTeamDto): Promise<{
        isSuccess: boolean;
        result: Team[];
    }>;
    getTeamById(teamId: string): Promise<{
        isSuccess: boolean;
        result: Team[];
    }>;
    updateTeam(teamId: string, teamData: UpdateTeamDto): Promise<{
        isSuccess: boolean;
        result: Team[];
    }>;
    deleteTeam(teamId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
