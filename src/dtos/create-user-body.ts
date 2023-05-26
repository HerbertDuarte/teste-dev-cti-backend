import { IsNotEmpty } from "class-validator"


export class CreateUserBody {
  
  id : any;

  @IsNotEmpty()
  displayName : string ;

  @IsNotEmpty()
  user : string ;

  @IsNotEmpty()
  password : string;

  // @IsNotEmpty()
  // score : JSON |any;

}