import { IsNotEmpty } from "class-validator"


export class UserBody {

  @IsNotEmpty()
  user : string ;

  @IsNotEmpty()
  password : string;

}