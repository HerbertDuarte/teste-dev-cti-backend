import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StudentService {

  constructor( private prisma: PrismaService){}

  async findStudent (id : string) {
    const student = await this.prisma.student.findUnique({
      where : {id},
      include : {
        StudentModule : {
          select :{
            module: true,
            id : true,
            score : true
          }
        }
      }
    })
  
    return student
  }

  async findStudentByUsername (username : string) {

    try {
      
    
    const data = await this.prisma.student.findUnique({
      where : {username},
      include : {
        StudentModule : {
          select :{
            module: true,
            id : true,
            score : true
          }
        }
      }
    })

    
    if(!data.StudentModule){
      return {
        ...data,
        media : undefined
      }
    }
    const studentModules = data.StudentModule
    const modulesWithMedia = studentModules.map((e) => {
      const sum = e.score.reduce(((accumulator,score) => accumulator + score), 0)

      const media = (sum/e.score.length).toFixed(1)

      return {
        ...e,
        media
      }
    })
    const newData = {
      ...data,
      StudentModule : modulesWithMedia
    }

    return newData
  } catch (error) {
    console.log(error)
    throw new HttpException("Usuário não encontrado", HttpStatus.UNAUTHORIZED)
  }
    
  }
}
