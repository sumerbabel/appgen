export function textConvertToTreeObject(text:string,pattern:string ='\n',patternSecondary:string ='\t',withHeader:boolean=true){
  if (pattern=='' ||pattern==null ){pattern='\n'}
  if (patternSecondary=='' ||patternSecondary==null ){patternSecondary='\t'}
      const textConvert =text.trim()
      const arrayText = textConvert.split(pattern)
      let headerValue = arrayText[0].split(patternSecondary);
      let headers =[]
      let rows =arrayText
      if (withHeader){
        headers =headerValue
        rows.splice(0,1)
      } else {
        headers= headerValue.map((value,index)=>''+index)
      }
      const arr = rows.map(function (row) {
        const values = row.split(patternSecondary);
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index];
          return object;
        }, {});
        return el;
      });
      return arr; 
}

