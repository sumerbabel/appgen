import { Inject, Injectable } from "@angular/core";
import { Programa } from "../a-domain/programa";
import { ProgramaDto } from "../a-domain/programa-dto";
import { ProgramaRepository } from "../a-domain/programa-repository";
import { PROGRAMA_REPOSITORY_TYPE } from "../c-infraestructure/programa-respository-type";
@Injectable({
  providedIn: 'root',
})
export class CreatePrograma {
  constructor(@Inject(PROGRAMA_REPOSITORY_TYPE) private readonly programaRepository: ProgramaRepository) { }
  programa : Programa

  newEmptyPrograma():Programa{
    return this.programa =Programa.createEmpty()
  }

  async save()  {
    if(this.programa.isValid){
      let data ={id:this.programa._id, name :this.programa.name}
      const result = await this.programaRepository.saveNew(data)
      return result
    }
    return false
  }


  async internalExecute(id: string): Promise<ProgramaDto> { return await this.programaRepository.findById(id) }
}
