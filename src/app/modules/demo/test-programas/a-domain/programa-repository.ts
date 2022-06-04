import { ProgramaDto } from "./programa-dto";

export interface ProgramaRepository  {
  findById(id: string): Promise<ProgramaDto>
  findArrayByIds(ids: Array<string>): Promise<ProgramaDto>
  findList(parameter: string): Promise<ProgramaDto[]>
  saveNew(parameter: ProgramaDto[]): Promise<void>
  saveChanges(parameter: ProgramaDto[]): Promise<void>
  delete(parameter: ProgramaDto[]): Promise<void>
}
