export  abstract class ErrorHandler
{
    protected translateError(error: string): string {
        
        if (error.match("auth/invalid-email"))
        {
         return "Digite um endereço de email válido";

        } else if (error.match("auth/email-already-in-use"))
        {
          return "Este email já esta sendo usado por outra conta";

        } else if(error.match("auth/wrong-password"))
        {
            return "Credenciais Invalidas";
        }

        return error;
}

}