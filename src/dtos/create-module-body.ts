import {  IsNotEmpty } from "class-validator"

export class StudentModuleBody {

  id?: string

  @IsNotEmpty()
  id_module : string

  @IsNotEmpty()
  id_student : string

  score : number[] | []
}

export class CreateModuleBody {

  @IsNotEmpty()
  name : string;
  
  StudentModule? : StudentModuleBody[]
}