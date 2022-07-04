import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { StyleButtonEnum } from '@sharedModule/components/atoms/button/style-enum/enum-style-button';
import { Icons } from '@sharedModule/enums/icons';
import { Colors } from '@sharedModule/enums/colors';

export class ActionButton {
    public static MINI_SAVE = { name: 'Guardar',tooltip:'Guardar datos', action: ActionGeneric.SAVE, icon: '', color: '', colorText: '', styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_CLOSE = { name: 'Cerrar',tooltip:'Cerrar', action: ActionGeneric.CLOSE, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_CANCEL = { name: 'Cancelar',tooltip:'Cancelar', action: ActionGeneric.CANCEL, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_NEW = { name: 'Nuevo',tooltip:'Nuevo Registro', action: ActionGeneric.NEW, icon:Icons.NEW, color:Colors.BLUE_GRADIENT_METAL, colorText:Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_DOWNLOAD = { name: 'Descargar',tooltip:'Descargar archivo', action: ActionGeneric.DOWNLOAD, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_UPLOAD = { name: 'Subir',tooltip:'Cargar archivo', action: ActionGeneric.UPLOAD, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_YES = { name: 'Si',tooltip:'Si', action: ActionGeneric.YES, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_NO = { name: 'No',tooltip:'No', action: ActionGeneric.NO, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_RETURN = { name: 'Retornar',tooltip:'Retornar a la ventana anterior', action: ActionGeneric.RETURN, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_EDIT = { name: 'Editar',tooltip:'Editar registro', action: ActionGeneric.EDIT, icon: Icons.EDIT, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_SHOW = { name: 'Ver', tooltip:'Ver', action: ActionGeneric.SHOW, icon: Icons.SHOW, color: Colors.GREEN, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_CODE = { name: 'Ver Código',tooltip:'', action: ActionGeneric.OPEN, icon: Icons.CODE, color: Colors.BLUE_GRADIENT, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_DELETE = { name: 'Eliminar',tooltip:'Eliminar registro', action: ActionGeneric.DELETE, icon: Icons.DELETE, color: Colors.GRAY, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_SELECT = { name: 'Seleccionar',tooltip:'Seleccionar', action: ActionGeneric.SELECT, icon: Icons.SELECT, color:Colors.YELLOW_GRADIENT, colorText:Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_SELECTALL = { name: 'Seleccionar todo',tooltip:'', action: ActionGeneric.SELECTALL, icon: Icons.SELECTALL, color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_UNSELECT = { name: 'Deseleccionar',tooltip:'', action: ActionGeneric.UNSELECT, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_UNSELECTALL = { name: 'Deseleccionar todo',tooltip:'', action: ActionGeneric.UNSELECTALL, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_ACCEPT = { name: 'Aceptar',tooltip:'Aceptar los cambios', action: ActionGeneric.ACCEPT, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_CREATE = { name: 'Crear',tooltip:'Crear', action: ActionGeneric.CREATE, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_UPDATE = { name: 'Actualizar',tooltip:'', action: ActionGeneric.UPDATE, icon: '', color: '', colorText: '', styleClass: StyleButtonEnum.MINIM, isVisible: true }
    public static MINI_OPEN = { name: 'Abrir',tooltip:'', action: ActionGeneric.OPEN, icon: Icons.OPEN, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_TOOL = { name: 'Herramientas',tooltip:'', action: ActionGeneric.OPEN, icon: Icons.TOOL, color: Colors.PURPLE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_COPY = { name: 'Copiar',tooltip:'', action: ActionGeneric.COPY, icon: Icons.COPY, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_ALING_LEFT = { name: '',tooltip:'', action: ActionGeneric.OPEN, icon: Icons.ALIGN_LEFT, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_HELP = { name: '',tooltip:'Ayuda / Información', action: ActionGeneric.OPEN, icon: Icons.HELP, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_FILTER = { name: '',tooltip:'Filtros', action: ActionGeneric.OPEN, icon: Icons.FILTER, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_CLEAR = { name: '',tooltip:'Limpiar', action: ActionGeneric.CLEAR, icon: Icons.CLEAR, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_DOCUMENT = { name: '',tooltip:'Documentos', action: ActionGeneric.EXECUTE, icon: Icons.COPY, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_SEARCH = { name: '',tooltip:'Buscar', action: ActionGeneric.EXECUTE, icon: Icons.SEARCH, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static MINI_EXPORT = { name: '',tooltip:'Exportar datos en excel', action: ActionGeneric.EXECUTE, icon: Icons.EXCEL_FILE, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }


    public static CLEAR = { name: 'Limpiar',tooltip:'Limpiar Filtros', action: ActionGeneric.CLEAR, icon: Icons.CLEAR, color: '#3a4a53', colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static SAVE = { name: 'Guardar',tooltip:'Guardar', action: ActionGeneric.SAVE, icon:Icons.SAVE, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CANCEL = { name: 'Cancelar',tooltip:'Cancelar', action: ActionGeneric.CANCEL, icon:Icons.CANCEL, color: Colors.GRAY_LIGHT, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static LOGIN = { name: 'Acceder',tooltip:'Acceder al sistema', action: ActionGeneric.ACCEPT, icon:Icons.ACCEPT, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static ACCEPT = { name: 'Aceptar',tooltip:'Aceptar', action: ActionGeneric.ACCEPT, icon:Icons.ACCEPT, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CLOSE = { name: 'Cerrar',tooltip:'Cerrar', action: ActionGeneric.CLOSE, icon:Icons.CLOSE, color: Colors.RED, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static MINI_SHOW_NODE = { name: 'Abrir Nodo',tooltip:'Abrir Nodo', action: ActionGeneric.SHOW, icon: Icons.CODE_FORK, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.MINIM], isVisible: true }
    public static NEW= { name: 'Nuevo Registro',tooltip:'Nuevo Registro', action: ActionGeneric.NEW, icon:Icons.STAR, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CREATE= { name: 'Nuevo Registro',tooltip:'Crear Registro', action: ActionGeneric.CREATE, icon:Icons.STAR, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CUSTOM_ACTION_A = { name: '', tooltip:'',action: ActionGeneric.ACCEPT, icon:Icons.STAR, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CUSTOM_ACTION_B  = { name: '', tooltip:'',action: ActionGeneric.ACCEPT, icon:Icons.SELECT_RIGHT, color: Colors.PURPLE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static CUSTOM_ACTION_C  = { name: '', tooltip:'',action: ActionGeneric.ACCEPT, icon: Icons.CODE_CUBE, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static REGISTER= { name: 'Registrarme en Sumer Code',tooltip:'', action: ActionGeneric.NEW, icon:'', color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static EXPAND= { name: 'Expandir',tooltip:'', action: ActionGeneric.OPEN, icon:Icons.EXPAND, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static COMPRESS= { name: 'Contraer',tooltip:'', action: ActionGeneric.CLOSE, icon:Icons.COMPRESS, color: Colors.PURPLE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static UPDATE= { name: 'Actualizar',tooltip:'Actualizar datos', action: ActionGeneric.OPEN, icon:Icons.UPDATE, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static NEXT= { name: 'Siguiente',tooltip:'Siguiente', action: ActionGeneric.NEXT, icon:Icons.ARROW_RIGHT, color: Colors.GREEN_GRADIENT_OPACI, colorText: Colors.BLACK, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static PREVIOUS= { name: 'Anterior',tooltip:'Anterior', action: ActionGeneric.PREVIOUS, icon:Icons.ARROW_LEFT, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static DOC= { name: 'Documentos',tooltip:'Documentos', action: ActionGeneric.OPEN, icon:Icons.UPLOAD, color: Colors.BLUE_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
    public static SEARCH = { name: 'Buscar',tooltip:'Buscar registros', action: ActionGeneric.ACCEPT, icon:Icons.SEARCH, color: Colors.GREEN_GRADIENT_METAL, colorText: Colors.WHITE, styleClass: [StyleButtonEnum.DEFAULT], isVisible: true }
  }
