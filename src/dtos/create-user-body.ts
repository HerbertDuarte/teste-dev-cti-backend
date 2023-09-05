import { IsNotEmpty } from "class-validator"


export class CreateUserBody {

  @IsNotEmpty()
  displayName : string ;

  @IsNotEmpty()
  user : string ;

  @IsNotEmpty()
  password : string;

  rolecode? : string
}