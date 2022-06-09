const phoneNumber = (val)=>{
    let phoneno = /^\d{10}$/;

    const  inp = String(val)

    if(inp.match(phoneno) && inp.length === 10){
        return true
    }
    else{
        return false
    }
}

const a = phoneNumber("753407564");


module.exports = phoneNumber;