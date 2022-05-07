import { TreeConvert } from './treeConvert';

export function stringToTreeObect(text:string,pattern:string ='\n'):TreeConvert[]{
    if (pattern=='' ||pattern==null ){pattern='\n'}
    let root = node('root');
    let textArray =text.split(pattern).filter(textItem =>  textItem.length>0 )
    textArray.reduce(append_rec,root); 

    return normalizeTreeObject(root.children);
}

function node(title,lvl?){
    var children = [],
        parent = null;
    return {
        value:title,
        children:children,
        lvl:()=>lvl==undefined?-1:lvl,
        parent:()=>parent,
        setParent:p=>{parent=p},
        appendChildren: function(c){
            children.push(c); 
            c.setParent(this);
            return this
        },
    }
}

function append_rec(prev,curr) {
    let patterTab = /\t/;
    if(typeof(curr)=='string'){
            curr = curr.split(patterTab);
            curr = node(curr.pop(),curr.length);
    }
    if(curr.lvl()>prev.lvl()){
        prev.appendChildren(curr);
    }else if(curr.lvl()<prev.lvl()){
        append_rec(prev.parent(),curr)
    }else{
        prev.parent().appendChildren(curr);
    }

    return curr;
}


function normalizeTreeObject(originalArrayObject:any[],parentObject?):TreeConvert[] {
    let arrayObjets:TreeConvert[]=[];
    originalArrayObject.forEach( itenOriginal=>{
      
        let newObject ={value:itenOriginal['value']}

        if(parentObject){
           if (parentObject.hasOwnProperty('children')=== false){
            parentObject['children'] =[];
           }

           parentObject.children.push(newObject);
        }

        if (itenOriginal.hasOwnProperty('children')){
            normalizeTreeObject(itenOriginal['children'],newObject)
        }
        arrayObjets.push(newObject);
    })

        return arrayObjets;
}
