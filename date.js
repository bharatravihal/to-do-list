module.exports.getdate=function (){
  let today=new Date();
    let day="";
    let options = { weekday: 'long',  month: 'long', day: 'numeric' };
    return today.toLocaleDateString("en-US", options);
    
}
module.exports.getday=function(){
    let today=new Date();
    let day="";
    let options = { weekday: 'long',  };
    return today.toLocaleDateString("en-US", options);
}
