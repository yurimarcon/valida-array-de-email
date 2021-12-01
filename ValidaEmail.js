/*************************************************************************
 * AUTOR: YURI MARCON
 * DATA DA CRIAÇÃO: 06/11/2019
 * 
 *  ESSE MÉTODO DEVE SER CHAMADO DA SEGUINTE FORMA:
 *  
 *      strigComEmails = devDGT.metodos.validaArreyDeEMail({
 * 
 *           "emails": stringComEmails 
 * 
 *      }).retorno;
 * 
 * O MÉTODO VAI RETORNAR A STRING RETIRANDO ESPAÇOS E SUBSTITUINDO 
 * ALGUNS SEPARADORES INVÁLIDOS 
 * 
 * **********************************************************************/

var emails;
var retorno;
var emailPosArrey;

if(_input || _input.emails){
    
    emails = _input.emails; //AQUI VAI RECEBER O CAMPO QUE ESTÁ OS EMAIL;
    
}else{
    
    return; // SE NÃO TIVER INPUT NÃO FAZ NADA;
    
}

emails = emails.replace(/\s{1,}/g, '');
emails = emails.replace(/;/g, ',' );
emails = emails.replace(/:/g, ',' );
emails = emails.replace(/[//]/g,',');
emails = emails.toLowerCase();

if (emails.match(",")){// VERIFICA SE EXISTE "," NA STRING, SE SIM EXISTE MAIS DE UM E-MAIL;
    
    var emailsArrey = emails.split(",");// SEPARA TUDO POR VÍRGULA;
    emailsArrey = emailsArrey.sort();
    for(let i = 0 ; i < emailsArrey.length ; i++ ){
        
        if(i === emailsArrey.length-1){
            break;
        }else{
            
            if(emailsArrey[i] === emailsArrey[1 + i]){
                
                throw("O e-mail '" + _utils.stringifyAsJson(emailsArrey[1 + i]) + "' está sendo informado duas vezes no mesmo campo.");
                
            }
            
        }
        
    } 
    // throw(_utils.stringifyAsJson(emailsArrey.sort()));
    
    emailsArrey.forEach(hit=>{
        
        // AQUI É FEITO UMA VALIDAÇÃO INTERNA DO SYDLE
        // emailPosArrey = crm.emailAddress.validateEmailAddress({"address": hit});
        emailPosArrey = validaEmail(hit);
        
        if(emailPosArrey.success === false){
            
            // SE O E-MAIL FOI INVÁLIDO DARÁ O ERRO COM O E-MAIL INVÁLIDO;
            throw(_utils.stringifyAsJson( "e-mail inválido : " + hit ));
            
        }
        
        if(!retorno){
            
            retorno = hit;
            
        }else{
            
            retorno += ','+hit;
            
        }
        
    });

}else{// SE SÓ TIVER UM E-MAIL ESTRARÁ NO ELSE
    
    // AQUI É FEITO UMA VALIDAÇÃO INTERNA DO SYDLE
    // emailPosArrey = crm.emailAddress.validateEmailAddress({"address": emails});
    emailPosArrey = validaEmail(emails);
    
    // SE O E-MAIL FOI INVÁLIDO DARÁ O ERRO COM O E-MAIL INVÁLIDO;
    if(emailPosArrey.success === false){
        
        throw(_utils.stringifyAsJson( "e-mail inválido : " + emails ));
        
    }
    
    retorno = emails;
    
}

_output.retorno = retorno;

return _output.retorno;

///////////////////////////////////////////////////////////////////////////////////////////////

function validaEmail(email){
    
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {"success": regex.test(email)};
    
}