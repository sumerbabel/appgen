import { createReducer, on } from '@ngrx/store';
import * as treeActions from './tree.actions';
import { TreeBase } from '../../tree-menu/domain/tree-base';
import { Tree } from 'src/app/app-modules/tree/domain/tree';

const initialState: TreeBase<Tree>[] = [];


export const treeReducer = createReducer(initialState,
  /*on(Add, (state, action) => ([...state, { id: uuid.v4(), text: action.text, todo: true }])),
  on(Remove, (state, action) => state.filter(i => i.id !== action.id)),
  on(Toggle, (state, action) => state.map(i => i.id === action.id ? {...i, todo: !i.todo} : i)),*/
)