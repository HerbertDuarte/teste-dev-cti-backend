import { IsNotEmpty } from "class-validator"

export class CreateStudentBody {

  @IsNotEmpty()
  name : string;

  @IsNotEmpty()
  username : string;

  @IsNotEmpty()
  cpf : number | any;

  @IsNotEmpty()
  date : Date;

  module : string[]
}