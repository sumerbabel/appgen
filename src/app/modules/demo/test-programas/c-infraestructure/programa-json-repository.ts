import { Injectable } from "@angular/core";
import { ProgramaDto } from "../a-domain/programa-dto";
import { ProgramaRepository } from "../a-domain/programa-repository";

@Injectable({
  providedIn: 'root',
})
export class ProgramaJsonRepository implements ProgramaRepository {
  async findById(id: string): Promise<ProgramaDto> {
    let data:ProgramaDto ={id:'223423432-23423423',name:'sistema test'}
    return data
  }
  async findArrayByIds(ids: string[]): Promise<ProgramaDto> {
    throw new Error("Method not implemented.");
  }
  async findList(parameter: string): Promise<ProgramaDto[]> {
    throw new Error("Method not implemented.");
  }
  async saveNew(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async saveChanges(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
