import { IsNotEmpty } from "class-validator"

export class CreateModuleBody {

  @IsNotEmpty()
  name : string;
  
  students? : string[]
}