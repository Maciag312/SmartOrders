export function onesplice(array, value){
    console.log("value" + value)
    for(var i = 0; i<array.length;i++){
      if(array[i].key===value){
        console.log("substr " + array.slice(0,i).concat(array.slice(i+1)))
        return array.slice(0,i).concat(array.slice(i+1))
      }
    }
    console.log(array)
    return array
  }

 