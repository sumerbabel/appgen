import { Inject, Injectable } from "@angular/core";
import { Programa } from "../a-domain/programa";
import { ProgramaDto } from "../a-domain/programa-dto";
import { ProgramaRepository } from "../a-domain/programa-repository";
import { PROGRAMA_REPOSITORY_TYPE } from "../c-infraestructure/programa-respository-type";

@Injectable({
  providedIn: 'root',
})
export class GetPrograma {
  constructor(  @Inject(PROGRAMA_REPOSITORY_TYPE) private readonly  programaRepository: ProgramaRepository) {
  }
  async internalExecute(id: string): Promise<ProgramaDto> {
   return  await this.programaRepository.findById(id)
  }


}
