import { PartialType } from "@nestjs/swagger";
import { CreateExperienceDTO } from "./create-experience.dto";

export class UpdateExperienceDTO extends PartialType(CreateExperienceDTO){}